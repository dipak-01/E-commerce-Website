 
const imageUrls = [
    'Images/models/model1 (1).webp',
    'Images/models/model1 (2).webp',
    'Images/models/model1 (3).webp',
    'Images/models/model1 (4).webp'
     
];

const imageElement = document.getElementById('changingImage');
let currentIndex = 0;

function changeImage() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    imageElement.src = imageUrls[currentIndex];
}

 
setInterval(changeImage, 5000);