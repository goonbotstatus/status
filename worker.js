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
      --bg:      #0c0c10;
      --surface: #13131c;
      --border:  rgba(255,255,255,0.07);
      --accent:  #7c6ff7;
      --text:    #e8e8f0;
      --dim:     #6b6b80;
      --red:     #ef4444;
      --red-lo:  rgba(239,68,68,0.08);
    }

    html, body {
      height: 100%;
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 15px;
      line-height: 1.6;
    }

    /* Subtle dot-grid background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
      z-index: 0;
    }

    /* Faint red ambient glow */
    body::after {
      content: '';
      position: fixed;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 400px;
      background: radial-gradient(ellipse, rgba(239,68,68,0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    .page {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    .wrap {
      width: 100%;
      max-width: 480px;
    }

    .header {
      text-align: center;
      margin-bottom: 28px;
    }
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #fff;
    }
    .header p {
      color: var(--dim);
      margin-top: 5px;
      font-size: 14px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-top: 1px solid rgba(239,68,68,0.35);
      border-radius: 16px;
      padding: 28px 28px 26px;
      box-shadow: 0 0 0 1px rgba(239,68,68,0.06),
                  0 24px 48px rgba(0,0,0,0.4);
    }

    .status-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }

    .pulse-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--red);
      flex-shrink: 0;
      animation: pulse 2.2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.55); }
      50%       { box-shadow: 0 0 0 7px rgba(239,68,68,0); }
    }

    .status-row h2 {
      font-size: 15px;
      font-weight: 600;
      color: var(--red);
      letter-spacing: 0.01em;
    }

    .card-body {
      font-size: 14px;
      color: var(--dim);
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .divider {
      height: 1px;
      background: var(--border);
      margin: 0 -28px 24px;
    }

    .actions {
      display: flex;
      gap: 10px;
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
      white-space: nowrap;
    }
    .btn:hover  { opacity: .82; }
    .btn:active { transform: scale(.97); }

    .btn-primary {
      background: var(--accent);
      color: #fff;
      flex: 1;
      justify-content: center;
    }
    .btn-secondary {
      background: transparent;
      color: var(--dim);
      border: 1px solid var(--border);
    }
    .btn-secondary:hover { color: var(--text); border-color: rgba(255,255,255,.16); }
  </style>
</head>
<body>
<div class="page">
  <div class="wrap">

    <div class="header">
      <h1>Goonbot</h1>
      <p>goonbot.net is currently unavailable</p>
    </div>

    <div class="card">
      <div class="status-row">
        <div class="pulse-dot"></div>
        <h2>Service Unavailable</h2>
      </div>

      <p class="card-body">
        The server is currently unreachable. This is a temporary outage —
        check the status page for live updates and estimated recovery time.
      </p>

      <div class="divider"></div>

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
</div>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    try {
      const response = await fetch(request);
      if (response.status >= 500) {
        return new Response(OUTAGE_HTML, {
          status: 503,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
      return response;
    } catch {
      return new Response(OUTAGE_HTML, {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  },
};
