let index = 0;
let autoSlide;

function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-item');
  const maxIndex = slides.length - 2;  // Aangepast om 2 kaarten tegelijk te tonen

  if (n > maxIndex) {
    index = 0; // Ga terug naar het begin als de index de limiet overschrijdt
  } else if (n < 0) {
    index = maxIndex; // Ga naar de laatste set van 2 kaarten
  } else {
    index = n;
  }

  const offset = -index * 50;  // Aangepast naar 50% voor 2 kaarten tegelijk
  document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(index + 2);  // Aangepast om 2 stappen vooruit te gaan
}

function prevSlide() {
  showSlide(index - 2);  // Aangepast om 2 stappen terug te gaan
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 3000);
}

document.querySelector('.carousel-container').addEventListener('mouseover', () => {
  clearInterval(autoSlide);
});

document.querySelector('.carousel-container').addEventListener('mouseout', () => {
  startAutoSlide();
});

startAutoSlide();
