// Config Settings
let lightboxclass = 'lightbox' // image class to add lightbox too
let closebtn = '&times;' // Close button content
let prevbtn = "<" // Prev Button Content
let nextbtn = ">" // Next Button Content
let navenable = true // Enable prev/next Buttons

let currentImageIndex = 0; // Keep track of the index of the currently displayed image

function loadLightbox(){
  // Find all images with the class "lightbox"
  var images = document.getElementsByClassName(lightboxclass);

  // Add a click event listener to each image
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() {
      openLightbox(this, images);
    });
  }
}

function openLightbox(image, images) {
  currentImageIndex = Array.prototype.indexOf.call(images, image); // Get the index of the clicked image in the array of all images
  // Create the lightbox container
  var lightboxContainer = document.createElement('div');
  lightboxContainer.classList.add('lightbox-container');
  document.body.appendChild(lightboxContainer);

  // Create the image container
  var imageContainer = document.createElement('div');
  imageContainer.classList.add('lightbox-image-container');
  lightboxContainer.appendChild(imageContainer);

  // Create the image
  var lightboximage = document.createElement('img');
  lightboximage.src = image.src;
  lightboximage.onerror = function() {
    console.error('Failed to load image:', image.src);
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    image.src = images[currentImageIndex].src;
  }
  imageContainer.appendChild(lightboximage);

  // Create the close button
  var closeButton = document.createElement('button');
  closeButton.classList.add('lightbox-close');
  closeButton.innerHTML = closebtn;
  closeButton.onclick = function() {
    lightboxContainer.remove();
  };
  lightboxContainer.appendChild(closeButton);

  if(navenable){
    // Create the next and previous buttons
    var prevButton = document.createElement('button');
    prevButton.innerHTML = prevbtn;
    prevButton.classList.add('lightbox-button');
    prevButton.classList.add('lightbox-prev');
    prevButton.onclick = function() {
      currentImageIndex--;
      if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
      }
      lightboximage.src = images[currentImageIndex].src; // Update the displayed image
    };
    imageContainer.appendChild(prevButton);

    var nextButton = document.createElement('button');
    nextButton.innerHTML = nextbtn;
    nextButton.classList.add('lightbox-button');
    nextButton.classList.add('lightbox-next');
    nextButton.onclick = function() {
      currentImageIndex++;
      if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
      }
      lightboximage.src = images[currentImageIndex].src; // Update the displayed image
    };
    imageContainer.appendChild(nextButton);
  }
}
