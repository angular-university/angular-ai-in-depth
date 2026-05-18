import { Request, Response } from 'express';

export function rootRoute(req: Request, res: Response) {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Angular AI In Depth — Server</title>
    <style>
      body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f0a1e; color: #e0d5f0; }
      .card { text-align: center; padding: 40px; border: 1px solid rgba(150,80,200,0.3); border-radius: 12px; }
      h1 { margin: 0 0 8px; color: #e91e8c; }
      p { margin: 0; color: #8a7aaa; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Server is running</h1>
      <p>Angular AI In Depth API — port ${process.env['PORT'] ?? 9000}</p>
    </div>
  </body>
</html>`);
}
