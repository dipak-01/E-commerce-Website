console.log("wor");
const productCardGenerator = (x) => {
  const element = document.getElementById("products-dummy");
  const element1 = document.getElementById("products-dummy1");

  fetch(`http://localhost:3000/cart`, { method:'get' , credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
          <button class="close-button">
            <i class="uil uil-times"></i>
          </button>
        </div>
      </div>
      <div class="pdt-details-bottom">
        <div class="inputs">
          <div class="inputs-button">
            <button class="minus"><i class="uil uil-minus"></i></button>
            <span class="Qty">${data.quantity} </span>
            <button class="add">
              <i class="uil uil-plus"></i>
            </button>
          </div>
        </div>
        <div class="mrp">₹ ${data2.price}.00</div>
      </div>
    </div> 
    </div>
  </div>`;
}

let x = document.getElementById("products");
productCardGenerator(x);
x.addEventListener("click", function (event) {
  let target = event.target.closest(".products");
  if (target) {
    let objId = target.getAttribute("data-objid");
    console.log("Clicked on product card with objId:", objId);
    if (objId) {
      window.location.href = `product.html?id=${objId}`;
    }
  }
});
