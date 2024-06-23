let keranjang = [];
let totalHarga = 0;

function tambahKeKeranjang(namaProduk, hargaProduk) {
  keranjang.push({ nama: namaProduk, harga: hargaProduk });
  totalHarga += hargaProduk;

  let keranjangItems = document.getElementById("keranjang-items");
  keranjangItems.innerHTML = "";

  for (let i = 0; i < keranjang.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `${keranjang[i].nama} - Rp ${formatRupiah(
      keranjang[i].harga
    )} <button onclick="hapusItem(${i})">Hapus</button>`;
    keranjangItems.appendChild(listItem);
  }

  let totalHargaElement = document.getElementById("total-harga");
  totalHargaElement.innerText = `Total: Rp ${formatRupiah(totalHarga)}`;
}

function hapusItem(index) {
  totalHarga -= keranjang[index].harga;
  keranjang.splice(index, 1);

  let keranjangItems = document.getElementById("keranjang-items");
  keranjangItems.innerHTML = "";

  for (let i = 0; i < keranjang.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `${keranjang[i].nama} - Rp ${formatRupiah(
      keranjang[i].harga
    )} <button onclick="hapusItem(${i})">Hapus</button>`;
    keranjangItems.appendChild(listItem);
  }

  let totalHargaElement = document.getElementById("total-harga");
  totalHargaElement.innerText = `Total: Rp ${formatRupiah(totalHarga)}`;
}

function formatRupiah(angka) {
  let reverse = angka.toString().split("").reverse().join("");
  let ribuan = reverse.match(/\d{1,3}/g);
  let formatted = ribuan.join(".").split("").reverse().join("");
  return formatted;
}

function checkout() {
  alert(`Total pembelian: Rp ${formatRupiah(totalHarga)}`);
}
