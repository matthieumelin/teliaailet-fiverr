import Swiper from 'swiper/swiper-bundle';

/** Composante Carousel de Timtools */
export default class Carousel {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;

    // Options par défaut pour la librairie Swiper
    this.defaultOptions = {
      slidesPerView: 1,
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
      },
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        type: 'bullets',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };

    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    let options = this.defaultOptions;

    // Gestion des paramètres différents lorsqu'on veut avoir
    // 2 slides visibles sur grand écran et une seule sur petit écran
    if (this.element.dataset.carousel == 'split') {
      options = {
        ...this.defaultOptions,
        ...{
          slidesPerView: 1,
          breakpoints: {
            768: {
              slidesPerView: 1,
            },
          },
          spaceBetween: 40,
        },
      };
    }
    if (this.element.dataset.carousel == 'galerie') {
      options = {
        ...this.defaultOptions,
        ...{  
          slidesPerView: 1,
          breakpoints: {
            768: {
              slidesPerView: 4,
            },
          },
          spaceBetween: 20,
        },
      };
    }
    //Gestion de pagination
    if (this.element.dataset.pagination == "true") {
      const pagination = document.createElement("div")
      pagination.classList.add("swiper-pagination")
      this.element.appendChild(pagination)
      options.pagination = {
          el: pagination,
          type: 'bullets',
      };
    }
    //Gestion de navigation
    if (this.element.dataset.navigation == "true") {
      const navigationPrev = document.createElement("div")
      navigationPrev.classList.add("swiper-button-prev")
      const navigationNext = document.createElement("div")
      navigationNext.classList.add("swiper-button-next")

      this.element.appendChild(navigationPrev)
      this.element.appendChild(navigationNext)
      options.navigation = {
          nextEl: navigationNext,
          prevEl: navigationPrev,
      };
    }



    // Instanciation d'un nouveau Swiper avec les options
    new Swiper(this.element, options);
    var icons = document.querySelectorAll(".heart")
    icons.forEach((icon) => {
      icon.addEventListener("click",function() {
        icon.classList.toggle("clicked")
      })
    })
  }
}
