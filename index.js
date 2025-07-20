const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const app = express();

const target = 'https://now.gg';
const cookies = JSON.parse(fs.readFileSync('./cookies.json', 'utf8'));

const proxy = createProxyMiddleware({
  target,
  changeOrigin: true,
  ws: true,

  onProxyReq: (proxyReq) => {
    const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');
    proxyReq.setHeader('cookie', cookieHeader);
    proxyReq.setHeader('referer', target);
    proxyReq.setHeader('origin', target);
    proxyReq.setHeader('user-agent', 'Mozilla/5.0');
    proxyReq.setHeader('accept-language', 'en-US,en;q=0.9');
    proxyReq.setHeader('accept', 'text/html,application/xhtml+xml');
  },

  pathRewrite: { '^/now': '/' }
});

app.get('/jogo', (req, res) => {
  res.send(`
    <html>
    <head><title>Jogo</title></head>
    <body style="margin:0;padding:0;">
      <iframe src="/now/apps/uncube/10005/" width="100%" height="100%" style="border:none;" allowfullscreen></iframe>
    </body>
    </html>
  `);
});

app.use('/now', proxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy rodando em http://localhost:${PORT}/jogo`);
});
