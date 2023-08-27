const imageUrls = [
  "Images/models/model1 (1).webp",
  "Images/models/model1 (2).webp",
  "Images/models/model1 (3).webp",
  "Images/models/model1 (4).webp",
];

const imageElement = document.getElementById("changingImage");
let currentIndex1 = 0;

function changeImage() {
  currentIndex1 = (currentIndex1 + 1) % imageUrls.length;
  imageElement.src = imageUrls[currentIndex1];
}

setInterval(changeImage, 5000);
const images = document.querySelectorAll(".image");
const leftButtons = document.querySelectorAll(".left-button");
const rightButtons = document.querySelectorAll(".right-button");
const totalImages = images.length;

let currentIndex = 0;
let isTransitioning = false; // Flag to prevent rapid clicking

leftButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isTransitioning) {
      console.log("Left Button is clicked!");
      isTransitioning = true;
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateSlider();
      setTimeout(() => {
        isTransitioning = false;
      }, 500); // Set a delay in milliseconds
    }
  });
});

rightButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isTransitioning) {
      console.log("Right Button is clicked!");
      isTransitioning = true;
      currentIndex = (currentIndex + 1) % totalImages;
      updateSlider();
      setTimeout(() => {
        isTransitioning = false;
      }, 500); // Set a delay in milliseconds
    }
  });
});

function updateSlider() {
  console.log("Update slider is working!");
  const imageWidth = images[0].offsetWidth;
  const translateValue = -currentIndex * imageWidth;

  images.forEach((image) => {
    image.style.transform = `translateX(${translateValue}px)`;
  });
}

updateSlider();
