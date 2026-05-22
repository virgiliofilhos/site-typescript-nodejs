const http = require('http');

const port = parseInt(process.env.PORT || '8080', 10);
const podName = process.env.HOSTNAME || 'unknown-pod';

const html = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Site Exemplo TypeScript + Node.js</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 2.5rem 3rem;
      max-width: 560px;
      width: 90%;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
      text-align: center;
    }
    h1 {
      font-size: 1.6rem;
      color: #38bdf8;
      margin-bottom: 1.2rem;
    }
    p {
      font-size: 1rem;
      color: #94a3b8;
      line-height: 1.7;
      margin-bottom: 0.8rem;
    }
    .pod {
      margin-top: 1.5rem;
      padding: 0.6rem 1rem;
      background: #0f172a;
      border-radius: 6px;
      font-size: 0.85rem;
      color: #64748b;
      font-family: monospace;
    }
    .pod span { color: #f472b6; }
  </style>
</head>
<body>
  <div class="card">
    <h1 id="greeting">Ol\u00e1 JC</h1>
    <p>este \u00e9 um modelo de site simples de exemplo em TypeScript e Node.js</p>
    <div class="pod">este container \u00e9 o pod <span>${podName}</span></div>
  </div>
  <script>
    (function () {
      var hour = new Date().getHours();
      var period = hour >= 6 && hour < 12
        ? 'bom dia'
        : hour >= 12 && hour < 18
          ? 'boa tarde'
          : 'boa noite';
      document.getElementById('greeting').textContent = 'Ol\u00e1 JC, ' + period + '!';
    })();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/healthz' || req.url === '/readyz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(port, () => {
  console.log('Server running on port ' + port + ' - pod: ' + podName);
});
