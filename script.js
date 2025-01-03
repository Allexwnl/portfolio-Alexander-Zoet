document.addEventListener('DOMContentLoaded', () => {
    function Components() {
        const navbarhtml = `
  <nav id="navbar">
        <div class="nav-header">
            <strong>Alexander Zoet</strong>
        </div>
        <div id="hamburgermenu">
            <div id="navigatie">
                <button id="menu-toggle" class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <ul id="nav-links" class="nav-links">
                <li>
                    <p><a href="index.html">HOME</a></p>
                </li>
                <li>
                    <p><a href="index.html#aboutme">OVER MIJ</a></p>
                </li>
                <li>
                    <p><a href="index.html#projecten">PROJECTEN</a></p>
                </li>
                <li>
                    <p><a href="index.html#contact">CONTACT</a></p>
                </li>
            </ul>
        </div>
  </nav>`;

        const navbarContainer = document.getElementById("navbarcontainer");
        if (navbarContainer) {
            navbarContainer.innerHTML = navbarhtml;
        }
        // Toggle nav-links visibility
        document.getElementById("menu-toggle").addEventListener("click", function () {
            const navLinks = document.getElementById("nav-links");
            navLinks.classList.toggle("show");
        });
    }
    Components();

    let currentIndex = 1; // Start bij de eerste echte kaart
    let autoScrollInterval;

    // Function to clone cards for seamless looping
    function setupCarousel() {
        const carousel = document.getElementById('carousel');
        const cards = Array.from(carousel.children);

        // Clone de eerste en laatste kaarten
        const firstCard = cards[0].cloneNode(true);
        const lastCard = cards[cards.length - 1].cloneNode(true);

        // Voeg clones toe
        carousel.appendChild(firstCard);
        carousel.insertBefore(lastCard, cards[0]);

        // Scroll naar de eerste echte kaart
        carousel.scrollLeft = cards[0].offsetLeft;

        // Initialiseer de index op 1 (de eerste echte kaart)
        currentIndex = 1;
    }

    // Function for auto-scrolling
    function autoScroll() {
        const carousel = document.getElementById('carousel');
        const cards = carousel.querySelectorAll('.carousel-card');
        const cardWidth = cards[0].offsetWidth + 16; // Adjust for card width + gap

        currentIndex++;

        if (currentIndex >= cards.length - 1) {
            // Reset position immediately
            carousel.scrollLeft = cards[1].offsetLeft;
            currentIndex = 1;
        } else {
            // Smooth scroll to the next card
            carousel.scrollTo({
                left: carousel.scrollLeft + cardWidth,
                behavior: 'smooth',
            });
        }
    }


    // Pause auto-scroll on hover
    function pauseAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Resume auto-scroll when not hovering
    function resumeAutoScroll() {
        autoScrollInterval = setInterval(autoScroll, 2000);
    }

    // Fetch JSON data and initialize the carousel
    fetch('certificaten.json')
        .then((response) => response.json())
        .then((data) => {
            const carousel = document.getElementById('carousel');
            data.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'carousel-card';
                card.style.background = item.color;
                card.textContent = item.title;

                // Create the certificate link as an anchor
                const certificateLink = document.createElement('a');
                certificateLink.href = item.link;
                certificateLink.target = '_blank';
                certificateLink.textContent = 'Zie certificaat';

                card.appendChild(certificateLink);
                carousel.appendChild(card);
            });

            // Setup carousel for looping
            setupCarousel();

            // Start auto-scroll
            autoScrollInterval = setInterval(autoScroll, 2000);

            // Add hover event listeners
            const carouselContainer = document.querySelector('.carousel-container');
            carouselContainer.addEventListener('mouseenter', pauseAutoScroll);
            carouselContainer.addEventListener('mouseleave', resumeAutoScroll);
        })
        .catch((error) => console.error('Error loading JSON:', error));

    // Scroll-based background changes
    const certificatenSection = document.getElementById('Certificaten');
    const hrElement = document.getElementById('hrsplit');
    const body = document.body;

    window.addEventListener('scroll', () => {
        const hrPosition = hrElement.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (hrPosition < windowHeight / 1 && window.innerWidth <= 864) {
            body.style.backgroundColor = 'black';
            certificatenSection.style.color = 'white';
            hrElement.style.border = "3px solid red";
        } else {
            body.style.backgroundColor = '#1b1b1b';
            certificatenSection.style.color = 'white';
            hrElement.style.border = "3px solid black";
        }
    });

    // Load and display project cards
    fetch("projectcards.json")
        .then((response) => response.json())
        .then((cards) => {
            cards.forEach((card) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('project-card');
                cardElement.innerHTML = `
        <img src="${card.img}">
        <h2>${card.title}</h2>
        <p>${card.description}</p>
        <a href="${card.url}" target="_blank">Zie project</a>
        `;
                document.getElementById('projects-container').appendChild(cardElement);
            });
        })
        .catch((error) => console.error('Error loading JSON:', error));
});
