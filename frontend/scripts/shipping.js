let totalMrp = 0;
const discountPrice = 2000;
const convenienceFee = 100;

const productCardGenerator = (x) => {
  const element = document.getElementById("products-dummy");
  const element1 = document.getElementById("products-dummy1");
  const element2 = document.getElementById("products-dum");
  //   const element3 = document.querySelector(".breakdown");
  const carting = document.querySelector(".cart .right");
  //   const element4 = document.getElementById("pay");
  fetch(`http://localhost:3000/orderPlaced`, {
    method: "get",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        element.style.display = "none";
        element1.style.display = "none";
        element2.style.display = "block";
      } else {
        carting.style.di;
        element.style.display = "none";
        element1.style.display = "none";
        carting.style.visibility = "visible";
        // element3.style.display = "block";
        // element4.style.display = "block";
        for (let i = 0; i < data.length; i++) {
          let objId = data[i].itemId;
          console.log(objId);
          fetch(`http://localhost:3000/product/${objId}`)
            .then((res2) => res2.json())
            .then((data2) => {
              console.log(data2);
              totalMrp += data2.price * data[i].quantity;
              console.log(totalMrp);
              let productCard = createProductCard(data2, data[i], objId);
              x.insertAdjacentHTML("beforeend", productCard);
              element.style.display = "none";
              element1.style.display = "none";
              console.log(discountPrice);
              updateTotalMrpDisplay(totalMrp, discountPrice, convenienceFee);
            });
        }
      }
    });
};

console.log("2");

function createProductCard(data2, data, objId) {
  console.log("3");

  return `
<div class="products"  data-objid="${objId}">
<div class="product-img">
  <img src="${data2.imageUrl1}" alt="" />
</div> 
<div class="product-details">
  <div class="pdt-details-top">
   <div class="pdt-title" "> ${data2.title}<br>   Size:${data.size} <br>Color: ${data2.colour} 
     </div>
    <div class="close">
      <button  onclick='deleteProduct("${objId}")' class="close-button">
         
      </button>
    </div>
  </div>
  <div class="pdt-details-bottom">Quantity : ${data.quantity}
    <div class="inputs">
      <div class="inputs-button">
         

        
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

function updateTotalMrpDisplay(totalMrp, discountPrice, convenienceFee) {
  // Display the updated total MRP value in the HTML element
  const totalMrpValueElement = document.getElementById("totalMrpValue");
  const discountElement = document.getElementById("discountPrice");
  const feeElement = document.getElementById("convenienceFee");
  const totalAmt = document.getElementById("totalamt");
  totalMrpValueElement.textContent = totalMrp;
  discountElement.textContent = discountPrice;
  feeElement.textContent = convenienceFee;
  totalAmt.textContent =
    totalMrp.toFixed(2) - discountPrice.toFixed(2) - convenienceFee.toFixed(2);
  document.querySelector(".orderTotal").textContent =
    totalMrp.toFixed(2) - discountPrice.toFixed(2) - convenienceFee.toFixed(2);

  var inputField = document.getElementById("myInput");

  console.log(inputField);
}

function fetchUserProfile() {
  fetch("http://localhost:3000/viewprofile", { credentials: "include" })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      document.querySelector(".firstName").textContent = data.firstName;
      document.querySelector(".lastName").textContent = data.lastName;
      //   document.querySelector(".email").textContent = data.email;
      document.querySelector(".phone").textContent = data.phone;
      document.querySelector(".addr1").textContent = data.addrs1;
      document.querySelector(".date").textContent = new Date();
      document.querySelector(".orderNo").textContent = Math.round(
        Math.random() * 100000
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

// Fetch and display user profile data when the page loads
window.addEventListener("load", fetchUserProfile);

// window.addEventListener("beforeunload", function (event) {
//   // You can confirm the redirection with a confirmation dialog
//   const confirmationMessage = "Are you sure you want to leave this page?";
//   event.returnValue = confirmationMessage; // For legacy browsers

//   // Redirect to the new URL
window.onbeforeunload = function () {
  console.log("reloader");
  window.setTimeout(function () {
    window.location = "landingPage.html";
  }, 0);
  window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
};

window.addEventListener("popstate", function (event) {
  window.location.href = "landingPage.html";
});
