var productList = document.getElementById("productList");
var message = document.getElementById("message");
var productModal = new bootstrap.Modal(document.getElementById("productModal"));

async function getProducts() {
  try {
    var response = await fetch("https://dummyjson.com/products");
    if (!response.ok) throw new Error("Ürünler alınamadı.");
    var data = await response.json();

    for (var i = 0; i < data.products.length; i++) {
      var product = data.products[i];
      var column = document.createElement("div");
      column.className = "col-12 col-md-6 col-lg-4";
      column.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img class="card-img-top" alt="" loading="lazy">
          <div class="card-body d-flex flex-column">
            <h2 class="card-title"></h2>
            <p class="category text-secondary"></p>
            <p class="price fw-bold"></p>
            <p class="rating"></p>
            <p class="stock"></p>
            <button class="btn btn-primary mt-auto" onclick="showDetail(${product.id})">Detay</button>
          </div>
        </div>`;

      column.querySelector("img").src = product.thumbnail;
      column.querySelector("img").alt = product.title;
      column.querySelector(".card-title").textContent = product.title;
      column.querySelector(".category").textContent = "Kategori: " + product.category;
      column.querySelector(".price").textContent = "Fiyat: $" + product.price;
      column.querySelector(".rating").textContent = "Puan: " + product.rating + " / 5";
      column.querySelector(".stock").textContent = "Stok: " + product.stock;
      productList.appendChild(column);
    }
    message.textContent = data.products.length === 0 ? "Ürün bulunamadı." : "";
  } catch (error) {
    message.textContent = "Ürünler yüklenemedi. Lütfen sayfayı yenileyin.";
  }
}

async function showDetail(id) {
  var detail = document.getElementById("productDetail");
  var detailMessage = document.getElementById("detailMessage");
  detail.hidden = true;
  detailMessage.textContent = "Ürün detayı yükleniyor...";
  document.getElementById("modalTitle").textContent = "Ürün Detayı";
  productModal.show();

  try {
    var response = await fetch("https://dummyjson.com/products/" + id);
    if (!response.ok) throw new Error("Detay alınamadı.");
    var product = await response.json();

    document.getElementById("modalTitle").textContent = product.title;
    document.getElementById("detailImage").src = product.thumbnail;
    document.getElementById("detailImage").alt = product.title;
    document.getElementById("detailDescription").textContent = product.description;
    document.getElementById("detailCategory").textContent = product.category;
    document.getElementById("detailPrice").textContent = "$" + product.price;
    document.getElementById("detailRating").textContent = product.rating + " / 5";
    document.getElementById("detailStock").textContent = product.stock;
    document.getElementById("detailBrand").textContent = product.brand || "Belirtilmemiş";
    detailMessage.textContent = "";
    detail.hidden = false;
  } catch (error) {
    detailMessage.textContent = "Ürün detayı yüklenemedi. Kapatıp tekrar deneyin.";
  }
}

getProducts();
