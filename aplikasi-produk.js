const http = require("http");
const url = require("url");

const { fetch, create, update, destroy } = require("./database/produk");

//const { readOne } = require("./database");

function setResponse(res, statusCode = 200, data = null, options = {}) {
  const headers = options.headers;
  for (const key in headers) {
    res.setHeader(key, headers[key]);
  }

  res.statusCode = statusCode;
  if (!data) {
    res.end();
    return;
  }
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  const method = req.method;
  const { pathname, query } = url.parse(reqUrl, true);

  if (pathname === "/produk") {
    if (method === "GET") {
      const dataProduk = fetch();
      setResponse(res, 200, dataProduk, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return;
    } else if (method === "POST") {
      let requestBody = "";
      req.on("data", (chunk) => {
        requestBody += chunk.toString();
      });
      req.on("end", () => {
        requestBody = JSON.parse(requestBody);
        create(requestBody);
        setResponse(res, 200, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
      return;
    } else if (method === "PUT") {
      let requestBody = "";
      req.on("data", (chunk) => {
        requestBody += chunk.toString();
      });
      req.on("end", () => {
        const data = fetch();
        const id = query.id;
        requestBody = JSON.parse(requestBody);
        update(requestBody, id);
        setResponse(res, 200, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
      return;
    } else if (method === "DELETE") {
      const id = query.id;
      destroy(id);
      setResponse(res, 200, null, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return;
    }
  }
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "resource not found" }));
});
const PORT = 4000;
server.listen(PORT);
console.log(`Served on Port ${PORT}`);
