/** Composante Video de Timtools */
export default class Video {
    /**
     * Méthode constructeur
     * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
     */
    constructor(element) {
      this.element = element;
      this.videoContainer = this.element.querySelector(".js-video");
      this.poster = this.element.querySelector(".js-poster")
      this.videoId = this.element.dataset.videoId;
      this.autoplay = this.poster ? 1 : 0;
      this.playerReady = false;
      this.controls = 1
      if (this.element.dataset.controlsHide === "true") {
          this.controls = 0
      }

      Video.instances.push(this)
  
  
      if (this.videoId) {
          Video.loadScript()
      }
      else {
          console.error("Vous devez spécifier un id")
      }
    }
    /**
     * Méthode de préparation de l'API youtube
     */
    static loadScript() {
        
        if (!Video.scriptIsLoading) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(script);

            Video.scriptIsLoading = true
        }
        
    }
  
    /**
     * Méthode d'initialisation 
     */
    init() {
        
        this.initPlayer = this.initPlayer.bind(this)
          if (this.poster) {
              this.element.addEventListener("click",this.initPlayer)
          }
          else {
              this.initPlayer();
          }
      
      }
      /**
     * Méthode de lancement du player vidéo
     */
      /**
       * method description
       * @param {event} event - l'evenement du lancement de la vidéo
       */
      initPlayer(event) {
          if (event) {
              this.element.removeEventListener("click",this.initPlayer)
          }
          this.player = new YT.Player(this.videoContainer, {
              videoId: this.videoId,
              height: "100%",
              width: "100%",
              playerVars: {
                  rel : 0,
                  fs: this.controls,
                  controls: this.controls,
                  autoplay: this.autoplay
              },
              events: {
                  onReady: () => {
                      this.playerReady = true;
                      const observer = new IntersectionObserver(this.watch.bind(this), {
                          rootMargin: "0px 0px 0px 0px"
                      });
                      observer.observe(this.element);
                  },
                  onStateCHange: (event) => {
                      if (event.data == YT.PlayerState.PLAYING) {
                          //pause tous les videos sauf celui qui joue
                          Video.pauseAll(this);
                      } else if (event.data == YT.PlayerState.ENDED) {
                          this.player.seekTo(0);
                          this.player.pauseVideo();
                      }
                  }
              } 
          });
      }
      /**
     * Méthode de pause de la vidéo lorsque la vidéo est hors de l'écran
     */
      watch(entries) {
           if (this.playerReady && !entries[0].isIntersecting) {
               this.player.pauseVideo();
           }
      }   
      static initAll() {
        document.documentElement.classList.add("is-video-ready")
          for (let i = 0; i < Video.instances.length; i++) {
              const instance = Video.instances[i];
              instance.init()
              
          }
      }
      static pauseAll(currentInstance) {
        for (let i = 0; i < Video.instances.length; i++) {
            const instance = Video.instances[i];
            if (instance.playerReady && instance !== currentInstance) {
                instance.pauseVideo();
            }
            
        }
      }
  }
  Video.instances = [];
  window.onYouTubeIframeAPIReady = Video.initAll;