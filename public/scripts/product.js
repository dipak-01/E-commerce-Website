const productCardGenerator=(x)=>{
  function createProductCard(product) {
    return `
      <div class="product">
        <img src="${product.imageUrl1}" alt=" product img" />
        <img id="change" src="${product.imageUrl2}" alt=" product img" />
        <div class="descr">
          <span>DUNK</span>
          <h4>${product.title}</h4>
          <h5>₹ ${product.price}</h5>
        </div>
        <div class="cart">
          <a href="#" title="Add to Wishlist"><i class="bx bx-heart wishlist"></i></a>
          <a href="#" title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
        </div>
      </div>`;
  }
  fetch("http://localhost:3000/product")
  .then((res) => res.json())
  .then((data) => {
    // Generate product cards and append them to the container
    for (let i = 0; i < 35; i++) {
      const productCard = createProductCard(data[i]);
      x.insertAdjacentHTML("beforeend", productCard);
    };
  })
  .catch((err) => {
    console.log(err);
  });
}

// Get the container element
let x = document.getElementById("productContainer1");
productCardGenerator(x);
  x = document.getElementById("productContainer2");
productCardGenerator(x);