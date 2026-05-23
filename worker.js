const OUTAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Goonbot — Unavailable</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #0c0c10;
      --surface:  #13131c;
      --border:   rgba(255,255,255,0.07);
      --accent:   #7c6ff7;
      --text:     #e8e8f0;
      --text-dim: #6b6b80;
      --red:      #ef4444;
      --red-lo:   rgba(239,68,68,0.12);
    }

    html, body {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      display: flex;
      flex-direction: column;
    }

    .page {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      max-width: 520px;
      margin: 0 auto;
      width: 100%;
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .header h1 {
      font-size: 30px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #fff;
    }
    .header p {
      color: var(--text-dim);
      margin-top: 4px;
      font-size: 14px;
    }

    .card {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 28px;
    }

    .card-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }

    .pulse-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--red);
      flex-shrink: 0;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6); }
      50%       { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
    }

    .card-top h2 {
      font-size: 16px;
      font-weight: 600;
      color: var(--red);
    }

    .card p {
      font-size: 14px;
      color: var(--text-dim);
      line-height: 1.65;
      margin-bottom: 24px;
    }

    .actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 18px;
      border-radius: 9px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      border: none;
      transition: opacity .15s, transform .1s;
    }
    .btn:hover  { opacity: .85; }
    .btn:active { transform: scale(.97); }

    .btn-primary {
      background: var(--accent);
      color: #fff;
    }
    .btn-secondary {
      background: transparent;
      color: var(--text-dim);
      border: 1px solid var(--border);
    }
    .btn-secondary:hover { color: var(--text); border-color: rgba(255,255,255,.18); }

    footer {
      text-align: center;
      padding: 24px 20px;
      font-size: 12px;
      color: var(--text-dim);
      opacity: .5;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <h1>Goonbot</h1>
      <p>goonbot.net is currently unavailable</p>
    </div>

    <div class="card">
      <div class="card-top">
        <div class="pulse-dot"></div>
        <h2>Service Unavailable</h2>
      </div>
      <p>The server is currently unreachable. This is a temporary outage — check the status page for live updates and estimated recovery time.</p>
      <div class="actions">
        <a href="https://status.goonbot.net" class="btn btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          View Status Page
        </a>
        <button class="btn btn-secondary" onclick="window.location.reload()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Try Again
        </button>
      </div>
    </div>
  </div>

  <footer>goonbot.net &nbsp;&middot;&nbsp; ${new Date().getFullYear()}</footer>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    try {
      const response = await fetch(request);

      // Treat 5xx responses from the origin as an outage
      if (response.status >= 500) {
        return new Response(OUTAGE_HTML, {
          status: 503,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }

      return response;
    } catch {
      // Origin completely unreachable (tunnel down, server off, etc.)
      return new Response(OUTAGE_HTML, {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  },
};
