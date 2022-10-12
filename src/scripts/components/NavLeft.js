/** Composante Header de Timtools */
export default class Header {
    /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante Header est instanciée
   */
    constructor(element) {
        this.element = element;
        

        //Option par défaut pour la composante Header
        this.scrollPosition = 0;
        this.scrollLimit = 0.1;
        this.lastScrollPosition = 0;
        if (this.element.dataset.limit < 100){
            this.scrollLimit = this.element.dataset.limit / 100;
        }
        this.html = document.documentElement;
        this.items = this.element.querySelectorAll(".nav-left-item");

        this.init();
    }
     
    /**
   * Méthode d'initialisation
   */
    init() {
        window.addEventListener("scroll",this.onScroll.bind(this))
    }
    /**
   * Méthode de gestion du Scroll
   */
    onScroll(event) {
        //Récuperation de la position du Scroll
        this.lastScrollPosition = this.scrollPosition;
        this.scrollPosition = this.html.scrollTop; 
        this.setHeaderState();
        this.setDirectionState();
        
    }
    /**
   * Méthode d'observation de l"état du Header
   */
    setHeaderState() {
        //Comparaison du la taille de la page totale avec la position du scroll
        const scrollHeight = this.html.scrollHeight;
        if (this.scrollPosition > scrollHeight * this.scrollLimit ) {
            this.html.classList.add("nav-left-hidden");
        }
        else {
            this.html.classList.remove("nav-left-hidden");
        } 
    }
    /**
   * Méthode d'observation de la direction du Scroll
   */
    setDirectionState() {
        
        if (this.scrollPosition >= this.lastScrollPosition ) {
            this.html.classList.add("is-scrolling-down")
            this.html.classList.remove("is-scrolling-up")
        }
        else {
            this.html.classList.add("is-scrolling-up")
            this.html.classList.remove("is-scrolling-down")
        }
    } 
    /**
   * Méthode de gestion l'animation d'apparition du nav-item
   */
    addAnimation(item,i) {
        setTimeout(()=> {
            item.classList.add("item-animation")
        },i*600)
    }
    /**
   * Méthode de gestion l'animation de disparition du nav-item
   */
    addDisppearAnimation(item,i) {
        setTimeout(()=> {
            item.classList.remove("item-animation")
        },i*500)
    }
    
}