/** Composante Scrolly de Timtools */
export default class Scrolly {
      /**
       * method constructor
       * @param {HTMLElement} element - Élément HTML sur lequel la composante Scrolly est instanciée
       */
    constructor(element){
        this.element = element;
        // Options par défaut pour la composante Scrolly
        this.options = {
            rootMargin: '0px 0px 0px 0px'
        };
        this.init();
    }    
    /**  
   * Méthode d'initialisation
   */
    init(){
        // Instanciation d'un Observer pour observer les éléments si ils apparaissent dans l'écran ou pas
        this.observer = new IntersectionObserver(
            this.watch.bind(this), 
            this.options
            
            );
        //Sélectionner les éléments scrolly
        const items = this.element.querySelectorAll('[data-scrolly]');
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            //Observer les éléments Scrolly
            this.observer.observe(item);
        }

    }
    /**  
   * Méthode de gestion d'appartition des éléments Scrolly
   */
    watch(entries){
        for (let index = 0; index < entries.length; index++) {
            const entry = entries[index];
            const target = entry.target;
            // Gestion de l'apparition du l'élément data-scrolly dans l'écran 
            if(entry.isIntersecting){
                
                target.classList.add('is-active');
                if (target.dataset.repeat == "once"){
                    //Gestion du cas Scrolly once
                    this.observer.unobserve(target);
                }
                


            }else{
                target.classList.remove('is-active');
            }

        }
    }
}