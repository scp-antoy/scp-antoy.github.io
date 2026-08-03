const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token';

function html(body) {
  return new Response(
    `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>登录</title><body>${body}</body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

function authPage(clientId, base) {
  const state = crypto.randomUUID();
  const redirectUri = `${base}/callback`;
  const authorizeUrl = `${GITHUB_AUTHORIZE}?client_id=${encodeURIComponent(clientId)}&scope=repo&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  const script = `
    function go() {
      window.location.replace(${JSON.stringify(authorizeUrl)});
    }
    if (window.opener) {
      try { window.opener.postMessage('authorizing:github', '*'); } catch (e) {}
      const onEcho = (e) => {
        if (e.data === 'authorizing:github') {
          window.removeEventListener('message', onEcho);
          go();
        }
      };
      window.addEventListener('message', onEcho);
      setTimeout(go, 2000);
    } else {
      go();
    }
  `;
  return html(`<script>${script}</script><p>正在跳转到 GitHub 授权...</p>`);
}

function callbackPage(base, token) {
  const payload = JSON.stringify({ token });
  const script = `
    if (window.opener) {
      try {
        window.opener.postMessage('authorization:github:success:' + ${JSON.stringify(payload)}, '*');
      } catch (e) {}
    }
    setTimeout(() => window.close(), 800);
  `;
  return html(`<script>${script}</script><p>登录成功，此窗口会自动关闭。</p>`);
}

function errorPage(base, message) {
  const payload = JSON.stringify({ message });
  const script = `
    if (window.opener) {
      try {
        window.opener.postMessage('authorization:github:error:' + ${JSON.stringify(payload)}, '*');
      } catch (e) {}
    }
  `;
  return html(`<script>${script}</script><p>授权失败：${message}</p>`);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const base = url.origin;
    const clientId = env.GITHUB_CLIENT_ID;
    const clientSecret = env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return html('<p>缺少 GITHUB_CLIENT_ID 或 GITHUB_CLIENT_SECRET 环境变量。</p>');
    }

    if (url.pathname === '/auth') {
      return authPage(clientId, base);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return errorPage(base, '未收到授权码');
      }
      const tokenResponse = await fetch(GITHUB_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: `${base}/callback`,
        }),
      });
      const data = await tokenResponse.json();
      if (!data.access_token) {
        return errorPage(base, '获取令牌失败：' + JSON.stringify(data));
      }
      return callbackPage(base, data.access_token);
    }

    return new Response('Not Found', { status: 404 });
  },
};
