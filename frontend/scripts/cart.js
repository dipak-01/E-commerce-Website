console.log("wor");
let totalMrp = 0;
const productCardGenerator = (x) => {
  const element = document.getElementById("products-dummy");
  const element1 = document.getElementById("products-dummy1");
  const element2 = document.getElementById("products-dum");

  fetch(`http://localhost:3000/cart`, { method: "get", credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        element.style.display = "none";
        element1.style.display = "none";
        element2.style.display = "block";
      }
      for (let i = 0; i < data.length; i++) {
        let objId = data[i].itemId;
        console.log(objId);
        fetch(`http://localhost:3000/product/${objId}`)
          .then((res2) => res2.json())
          .then((data2) => {
            console.log(data2);
            let productCard = createProductCard(data2, data[i], objId);
            x.insertAdjacentHTML("beforeend", productCard);
            element.style.display = "none";
            element1.style.display = "none";
            logTotal();
          });
      }
    });
};
// const productCard = createProductCard(data);

// x.insertAdjacentHTML("beforeend", productCard);

console.log("2");
// };
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

function createProductCard(data2, data, objId) {
  console.log("3");
  totalMrp = totalMrp + data2.price;

  return `
  <div class="products"  data-objid="${objId}">
    <div class="product-img">
      <img src="${data2.imageUrl1}" alt="" />
    </div> 
    <div class="product-details">
      <div class="pdt-details-top">
       <div class="pdt-title" "> ${data2.title} size:${data.size} <p> Color: ${data2.colour}</p> 
         </div>
        <div class="close">
          <button  onclick='deleteProduct("${objId}")' class="close-button">
            <i class="uil uil-times point"></i>
          </button>
        </div>
      </div>
      <div class="pdt-details-bottom">
        <div class="inputs">
          <div class="inputs-button">
            <button  class="point"><i class="uil uil-minus"></i></button>
            <span class="Qty">${data.quantity} </span>
            <button class="add">
              <i class="uil uil-plus point"></i>
            </button>
          </div>
        </div>
        <div class="mrp">₹ ${data2.price}.00</div>
      </div>
    </div> 
    </div>
  </div>`;
  logTotal();
}

let x = document.getElementById("products");
productCardGenerator(x);
x.addEventListener("click", function (event) {
  if (
    !event.target.closest(".inputs-button") &&
    !event.target.closest(".close-button")
  ) {
    let target = event.target.closest(".products");
    if (target) {
      let objId = target.getAttribute("data-objid");
      console.log("Clicked on product card with objId:", objId);
      if (objId) {
        window.location.href = `product.html?id=${objId}`;
      }
    }
  }
});

function deleteProduct(objId) {
  console.log("inside func");
  console.log(`http://localhost:3000/remove/${objId}`);
  fetch(`http://localhost:3000/remove/${objId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Product removed successfully.");
        location.reload();
      } else {
        console.error("Failed to remove product to cart.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
