const fs = require("fs");
const path = require("path");
const dbPath = path.resolve(__dirname, "./Produk.json");

function getData() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
  let data = fs.readFileSync(dbPath);
  data = data.toString("utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), { encoding: "utf-8" });
}

function fetch() {
  let data = getData();
  return data;
}

function getOne(id) {
  let data = getData();
  return data.find((d) => d.id == id);
}

function create(bodyData) {
  let data = getData();
  data.push(bodyData);
  writeData(data);
  return bodyData;
}
function tambahBarang() {
  const id = prompt("Input ID Barang: ");
  const namaBarang = prompt("Input Nama Barang: ");
  const hargaBarang = prompt("Input Harga  Barang: ");
  const kuantitasBarang = prompt("Input Kuantitas Barang: ");

  const barang = {
    id,
    namaBarang,
    hargaBarang,
    kuantitasBarang,
  };
  create(barang);
}

function updateBarang(id) {
  const namaBarang = prompt("Input Nama Barang: ");
  const hargaBarang = prompt("Input Harga  Barang: ");
  const kuantitasBarang = prompt("Input Kuantitas Barang: ");

  const barang = {
    namaBarang,
    hargaBarang,
    kuantitasBarang,
  };

  update(barang, id);
}
function update(bodyData, id) {
  let data = getOne(id);
  let allData = fetch();
  data = { ...data, ...bodyData };
  const index = allData.findIndex((d) => d.id == id);
  if (index === undefined || !data) {
    return null;
  }
  allData[index] = data;
  writeData(allData);
  return data;
}

function readOne(id) {
  let data = fetch();
  data = data.find((d) => d.id == id);
  console.log(data);
}
function destroy(id) {
  let data = fetch();
  data = data.filter((d) => d.id != id);
  writeData(data);
}

module.exports = {
  fetch,
  create,
  getOne,
  update,
  destroy,
  readOne,
};
