import Carousel from './components/Carousel';
import Header from './components/Header';
import Cursor from "./components/Cursor"
import Scrolly from './components/Scrolly';
import Video from "./components/Video";
import NavLeft from "./components/NavLeft"

export default class ComponentsFactory {
    constructor(){
        this.componentsList= {
           
            Carousel,
            Header,
            Cursor,
            Scrolly,
            Video,
            NavLeft
           
        };
        this.init();
    }
    init() {
        const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentsList[componentName]){
          new this.componentsList[componentName](element);
      }
      else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
      
    }
    }
}