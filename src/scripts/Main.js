import Icons from './utils/Icons';
import ComponentsFactory from "./ComponentsFactory"

/** Classe principale du projet */
class Main {
  /**
   * Méthode constructeur
   */
  constructor() {
    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    document.documentElement.classList.add('has-js');
    new ComponentsFactory();
    this.pagesManager();
     Icons.load();
  }
  /**
   * Méthode de gestion des pages
   */
   pagesManager() {
    
    var pages = document.querySelectorAll(".contain");
    pages.forEach((page) => {
      var nextBtn = page.querySelector(".next-btn")
      if (nextBtn) {
        this.nextPage(pages,page,nextBtn)
      }
      var prevBtn = page.querySelector(".prev-btn")
      if (prevBtn) {
        this.prevPage(pages,page,prevBtn)
      }
    })
  }
  /**
   * Méthode d'aller a la page précédente
   */
  prevPage(pages,page,prevBtn) {
    var table = ["first","seconde","third","fourth"]
    prevBtn.addEventListener("click",function() {
      var next = (table.indexOf(page.classList[0]) - 1)% table.length
      if (next === 0) {
        document.querySelector(".form-container").classList.remove("actif-container")
      }
      else {
        document.querySelector(".form-container").classList.add("actif-container")
      }
      
      pages[next].classList.toggle("actifPage")
      page.classList.toggle("actifPage")
    })
  }
  /**
   * Méthode d'aller a la page suivante
   */
  nextPage(pages,page,nextBtn) {

    var table = ["first","seconde","third","fourth"]
    nextBtn.addEventListener("click",function() {
      var next = (table.indexOf(page.classList[0]) + 1)% table.length
      if (next === 0) {
        document.querySelector(".form-container").style.display="none"
      }
      else {
        document.querySelector(".form-container").style.display="block"
      }
      
      pages[next].classList.toggle("actifPage")
      page.classList.toggle("actifPage")
    })
  }
}
new Main();
