// generate-index.js
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);
const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.webp'));

if (files.length === 0) {
  console.log('No image files found.');
  return;
}

const rows = files
  .map(f => {
    const url = `./${f}`;
    return `
      <tr>
        <td>${f}</td>
        <td><a href="${url}" target="_blank">${url}</a></td>
        <td><button onclick="copyUrl('${url}')">Copy URL</button></td>
      </tr>`.trim();
  })
  .join('\n');

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Pinterest Image URLs</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 8px; border-bottom: 1px solid #ddd; text-align: left; }
      th { background: #f5f5f5; }
      a { text-decoration: none; color: #007bff; }
      button { cursor: pointer; }
    </style>
    <script>
      function copyUrl(url) {
        navigator.clipboard.writeText(url).then(() => {
          alert('URL copied: ' + url);
        }).catch(err => {
          alert('Failed to copy: ' + err);
        });
      }
    </script>
  </head>
  <body>
    <h1>Pinterest image URLs</h1>
    <table>
      <thead>
        <tr>
          <th>Filename</th>
          <th>URL</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </body>
</html>`;

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('index.html generated.');
