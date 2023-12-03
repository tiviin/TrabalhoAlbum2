document.addEventListener("DOMContentLoaded", function () {
    fetch("https://my-json-server.typicode.com/tiviin/album/albums")
        .then((response) => response.json())
        .then((data) => {
            const albumsSection = document.querySelector('.albums-section');

            data.forEach((album) => {
                const albumElement = document.createElement("div");
                albumElement.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");

                const albumLink = document.createElement("a");
                albumLink.href = `detalhes.html?albumId=${album.id}`;
                albumLink.classList.add("text-decoration-none", "text-reset");

                const coverDiv = document.createElement("div");
                coverDiv.classList.add("tamanhodiv");

                const coverImage = document.createElement("img");
                coverImage.src = album.coverImageUrl;
                coverImage.classList.add("imagenstamanho", "rounded");
                coverDiv.appendChild(coverImage);

                albumLink.appendChild(coverDiv);

                const albumDetails = document.createElement("div");

                const albumTitle = document.createElement("h3");
                albumTitle.textContent = album.title;

                const albumDescription = document.createElement("p");
                albumDescription.textContent = album.description;

                albumDetails.appendChild(albumTitle);
                albumDetails.appendChild(albumDescription);

                albumLink.appendChild(albumDetails);
                albumElement.appendChild(albumLink);
                albumsSection.appendChild(albumElement);

                // Adiciona o evento de clique para o elemento do álbum
                albumElement.addEventListener('click', function(event) {
                    event.preventDefault(); // Previne o comportamento padrão do link
                    window.location.href = `detalhes.html?albumId=${album.id}`;
                });
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar os álbuns:", error);
        });
});


document.addEventListener("DOMContentLoaded", function () {
    fetch("https://my-json-server.typicode.com/tiviin/album/albums")
        .then((response) => response.json())
        .then((data) => {
            const carouselInner = document.querySelector('.carousel-inner');

            data.forEach((album, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active');
                }

                const img = document.createElement('img');
                img.src = album.coverImageUrl;
                img.classList.add('d-block', 'w-100', 'mx-auto');
                img.style.maxWidth = '350px'; // Define a largura máxima para 300px
                img.style.height = 'auto'; // Mantém a proporção

                carouselItem.appendChild(img);
                carouselInner.appendChild(carouselItem);
            });

            const carousel = new bootstrap.Carousel(document.querySelector('.carousel'), {
                wrap: false // Impede a iteração de volta para o primeiro slide
            });

            const totalSlides = carouselInner.querySelectorAll('.carousel-item').length;
            const nextButton = document.querySelector('[data-bs-slide="next"]');
            const prevButton = document.querySelector('[data-bs-slide="prev"]');

            nextButton.addEventListener('click', function () {
                const currentSlide = carousel._activeIndex + 1;

                if (currentSlide === totalSlides) {
                    carousel.pause(); // Pausa o carrossel após a última imagem
                }
            });

            prevButton.addEventListener('click', function () {
                const currentSlide = carousel._activeIndex + 1;

                if (currentSlide === 1) {
                    carousel.pause(); // Pausa o carrossel antes do primeiro slide
                }
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar as imagens do JSON:", error);
        });
});


const navbarToggle = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        function toggleNavbar() {
            if (window.innerWidth <= 760) {
                navbarCollapse.classList.toggle('show');
            } else {
                navbarCollapse.classList.remove('show');
            }
        }

        window.addEventListener('resize', toggleNavbar);
        navbarToggle.addEventListener('click', toggleNavbar);




