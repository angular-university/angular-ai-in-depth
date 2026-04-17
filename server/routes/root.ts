import { Request, Response } from 'express';

export function root(_req: Request, res: Response) {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Angular AI In Depth — Server</title>
        <style>
          body { font-family: system-ui, sans-serif; padding: 2rem; }
        </style>
      </head>
      <body>
        <h1>Server is running</h1>
      </body>
    </html>
  `);
}
