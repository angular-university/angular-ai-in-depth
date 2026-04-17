import express from 'express';

const PORT = process.env['PORT'] ?? 9000;

const app = express();

app.get('/', (_req, res) => {
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
        <p>Port: <strong>${PORT}</strong></p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
