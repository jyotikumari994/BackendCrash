// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port
const PORT = 3000;

// Function to generate directory listing HTML
const generateDirectoryListing = (directoryPath, items) => {
  let html = `
    <html>
      <head>
        <title>Directory Listing</title>
        <style>
          ul { list-style-type: none; }
          li { margin: 5px 0; }
        </style>
      </head>
      <body>
        <h1>Directory Listing for ${directoryPath}</h1>
        <ul>
          ${items.map(item => {
            const itemPath = path.join(directoryPath, item);
            const isDirectory = fs.lstatSync(itemPath).isDirectory();
            const icon = isDirectory ? '📁' : '📄';
            const link = encodeURIComponent(path.relative(__dirname, itemPath));
            return `<li>${icon} <a href="/${link}">${item}</a></li>`;
          }).join('')}
        </ul>
      </body>
    </html>
  `;
  return html;
};

// Function to handle requests
const requestHandler = (req, res) => {
  const requestedPath = decodeURIComponent(req.url);
  const fullPath = path.join(__dirname, requestedPath);

  if (!fs.existsSync(fullPath)) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
    return;
  }

  const stats = fs.lstatSync(fullPath);

  if (stats.isDirectory()) {
    fs.readdir(fullPath, (err, items) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1>');
        return;
      }
      const html = generateDirectoryListing(fullPath, items);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });
  } else if (stats.isFile()) {
    const fileStream = fs.createReadStream(fullPath);
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    fileStream.pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
};

// Create server
const server = http.createServer(requestHandler);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
