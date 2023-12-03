
        document.addEventListener("DOMContentLoaded", function () {
            fetch("https://my-json-server.typicode.com/tiviin/album/albums")
                .then((response) => response.json())
                .then((data) => {
                    const params = new URLSearchParams(window.location.search);
                    const albumId = params.get('albumId');

                    const selectedAlbum = data.find(album => album.id === parseInt(albumId));

                    if (selectedAlbum) {
                        const albumTitle = selectedAlbum.title;
                        const albumDescription = selectedAlbum.description;
                        const albumLocation = `Latitude: ${selectedAlbum.location.latitude}, Longitude: ${selectedAlbum.location.longitude}`;
                        const albumDate = selectedAlbum.date;
                        const coverImageUrl = selectedAlbum.coverImageUrl;

                        const albumImagesContainer = document.getElementById('albumImages');

                        const albumDetails = document.createElement('div');
                        albumDetails.classList.add('container');

                        const rowDiv = document.createElement('div');
                        rowDiv.classList.add('row', 'row-xlg-2');

                        const titleH1 = document.createElement('h1');
                        titleH1.classList.add('row', 'd-flex');
                        titleH1.textContent = `Viagem ${albumTitle}`;

                        const flexDiv = document.createElement('div');
                        flexDiv.classList.add('d-flex', 'flex-md-row', 'flex-column', 'align-items-center');

                        const colImgDiv = document.createElement('div');
                        colImgDiv.classList.add('col-4');

                        const img = document.createElement('img');
                        img.src = coverImageUrl;
                        img.classList.add('w-100');

                        colImgDiv.appendChild(img);

                        const colInfoDiv = document.createElement('div');
                        colInfoDiv.classList.add('col-8', 'p-2');

                        const albumTitleEl = document.createElement('h5');
                        albumTitleEl.textContent = albumTitle;

                        const albumDescriptionEl = document.createElement('p');
                        albumDescriptionEl.textContent = albumDescription;

                        const detailsRow = document.createElement('div');
                        detailsRow.classList.add('row');

                        const locationCol = document.createElement('div');
                        locationCol.classList.add('col-8');

                        const locationTitle = document.createElement('h4');
                        locationTitle.textContent = 'Localização';

                        const locationParagraph = document.createElement('p');
                        locationParagraph.textContent = albumLocation;

                        locationCol.appendChild(locationTitle);
                        locationCol.appendChild(locationParagraph);

                        const dateCol = document.createElement('div');
                        dateCol.classList.add('col-4');

                        const dateTitle = document.createElement('h4');
                        dateTitle.textContent = 'Data de Registro';

                        const dateParagraph = document.createElement('p');
                        dateParagraph.textContent = albumDate;

                        dateCol.appendChild(dateTitle);
                        dateCol.appendChild(dateParagraph);

                        detailsRow.appendChild(locationCol);
                        detailsRow.appendChild(dateCol);

                        colInfoDiv.appendChild(albumTitleEl);
                        colInfoDiv.appendChild(albumDescriptionEl);
                        colInfoDiv.appendChild(detailsRow);

                        flexDiv.appendChild(colImgDiv);
                        flexDiv.appendChild(colInfoDiv);

                        rowDiv.appendChild(titleH1);
                        rowDiv.appendChild(flexDiv);

                        albumDetails.appendChild(rowDiv);
                        albumImagesContainer.appendChild(albumDetails);

                        selectedAlbum.fotos.forEach((imageUrl, index) => {
                            const imgContainer = document.createElement('div');
                            imgContainer.classList.add('col-sl-12', 'col-md-6', 'col-lg-3', 'mb-4');

                            const imgDiv = document.createElement('div');
                            imgDiv.classList.add('tamanhodiv');

                            const imgElement = document.createElement('img');
                            imgElement.src = imageUrl;
                            imgElement.classList.add('imagenstamanho', 'rounded');
                            imgDiv.appendChild(imgElement);

                            const imgDescription = document.createElement('div');
                            const imgTitle = document.createElement('h5');
                            const imgParagraph = document.createElement('p');
                            const imgButton = document.createElement('button');

                            imgButton.textContent = "Ver imagem expandida";
                            imgButton.classList.add('btn', 'btn-primary');
                            imgButton.setAttribute('type', 'button');
                            imgButton.setAttribute('data-bs-toggle', 'modal');
                            imgButton.setAttribute('data-bs-target', `#imagemModal${index}`);

                            imgDescription.appendChild(imgTitle);
                            imgDescription.appendChild(imgParagraph);
                            imgDescription.appendChild(imgButton);

                            imgContainer.appendChild(imgDiv);
                            imgContainer.appendChild(imgDescription);

                            albumImagesContainer.appendChild(imgContainer);
                            const modal = document.createElement('div');
                            modal.classList.add('modal', 'fade');
                            modal.setAttribute('id', `imagemModal${index}`);
                            modal.setAttribute('tabindex', '-1');
                            modal.setAttribute('aria-labelledby', `imagemModal${index}Label`);
                            modal.setAttribute('aria-hidden', 'true');

                            const modalDialog = document.createElement('div');
                            modalDialog.classList.add('modal-dialog', 'modal-xl');

                            const modalContent = document.createElement('div');
                            modalContent.classList.add('modal-content');

                            const modalHeader = document.createElement('div');
                            modalHeader.classList.add('modal-header');

                            const modalTitle = document.createElement('h1');
                            modalTitle.classList.add('modal-title', 'fs-5');
                            modalTitle.setAttribute('id', `imagemModal${index}Label`);
                            modalTitle.textContent = 'Foto expandida';

                            const modalCloseBtn = document.createElement('button');
                            modalCloseBtn.setAttribute('type', 'button');
                            modalCloseBtn.classList.add('btn-close');
                            modalCloseBtn.setAttribute('data-bs-dismiss', 'modal');
                            modalCloseBtn.setAttribute('aria-label', 'Close');

                            const modalBody = document.createElement('div');
                            modalBody.classList.add('modal-body');

                            const carousel = document.createElement('div');
                            carousel.classList.add('carousel', 'slide');
                            carousel.setAttribute('id', `carouselExampleControls${index}`);
                            carousel.setAttribute('data-bs-ride', 'carousel');

                            const carouselInner = document.createElement('div');
                            carouselInner.classList.add('carousel-inner');

                            const albumImages = selectedAlbum.fotos;
                            albumImages.forEach((image, i) => {
                                const carouselItem = document.createElement('div');
                                carouselItem.classList.add('carousel-item');
                                if (i === 0) {
                                    carouselItem.classList.add('active');
                                }

                                const img = document.createElement('img');
                                img.src = image;
                                img.classList.add('d-block', 'w-100');
                                carouselItem.appendChild(img);

                                carouselInner.appendChild(carouselItem);
                            });

                            carousel.appendChild(carouselInner);
                            modalBody.appendChild(carousel);

                            const carouselControlsPrev = document.createElement('button');
                            carouselControlsPrev.classList.add('carousel-control-prev');
                            carouselControlsPrev.setAttribute('type', 'button');
                            carouselControlsPrev.setAttribute('data-bs-target', `#carouselExampleControls${index}`);
                            carouselControlsPrev.setAttribute('data-bs-slide', 'prev');

                            const prevIcon = document.createElement('span');
                            prevIcon.classList.add('carousel-control-prev-icon');
                            prevIcon.setAttribute('aria-hidden', 'true');

                            carouselControlsPrev.appendChild(prevIcon);

                            const carouselControlsNext = document.createElement('button');
                            carouselControlsNext.classList.add('carousel-control-next');
                            carouselControlsNext.setAttribute('type', 'button');
                            carouselControlsNext.setAttribute('data-bs-target', `#carouselExampleControls${index}`);
                            carouselControlsNext.setAttribute('data-bs-slide', 'next');

                            const nextIcon = document.createElement('span');
                            nextIcon.classList.add('carousel-control-next-icon');
                            nextIcon.setAttribute('aria-hidden', 'true');

                            carouselControlsNext.appendChild(nextIcon);

                            carousel.appendChild(carouselControlsPrev);
                            carousel.appendChild(carouselControlsNext);

                            modal.appendChild(modalDialog);
                            modalDialog.appendChild(modalContent);
                            modalContent.appendChild(modalHeader);
                            modalHeader.appendChild(modalTitle);
                            modalHeader.appendChild(modalCloseBtn);
                            modalContent.appendChild(modalBody);

                            document.body.appendChild(modal);
                        });
                    } else {
                        console.error('Álbum não encontrado');
                    }
                })
                .catch((error) => {
                    console.error("Erro ao carregar os álbuns:", error);
                });
        });        
