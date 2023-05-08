const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  const method = req.method;
  const { pathname, query } = url.parse(reqUrl, true);

  //res.writeHead (200,{'content-type':'application/json'})
  res.setHeader("content-type", "application/json");
  res.statusCode = 200;

  res.end(
    JSON.stringify({
      message: "hello-world",
      url: pathname,
      method,
      query,
    })
  );
});
const PORT = 4000;
server.listen(PORT);
console.log(`Served on Port ${PORT}`);
