class Canvas{

      constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');
        this.canvas.bDraw = false;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 300, 150); /* -dimenssions- */
        this.canvas.addEventListener("mousedown", this.downDraw.bind(this));
        this.canvas.addEventListener("mouseup", this.upDraw.bind(this));
        this.canvas.addEventListener("mousemove", this.moveDraw.bind(this));
                         /*--------------------------*/
        this.canvas.addEventListener("touchstart", this.downDraw.bind(this));
        this.canvas.addEventListener("touchend", this.upDraw.bind(this));
        this.canvas.addEventListener("touchmove", this.moveDraw.bind(this));
  }
 
 //------------ CANVAS ------------------//
      //-- poser le point --//
      downDraw(e){ 
        e.preventDefault(); /* évite de continuer le traitement d'un évènement par le navigateur */
        var canvas = e.currentTarget, /* Identifie la cible actuelle d'un évenement */
        Pos = this.getPosition(e); /* Retourne la position d'un élément */
        canvas.posX = Pos.posX;
        canvas.posY = Pos.posY;
        canvas.bDraw = true;
      }

      //-- mouvement du pointeur --//
      moveDraw(e){ 
        var canvas = e.currentTarget,
        Pos = null;
        if(canvas.bDraw == false){ /*-----------*/
        return false;
        }
        Pos = this.getPosition(e);

        //-- dessiner --//
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath(); 
        this.ctx.moveTo((canvas.posX), canvas.posY);
        this.ctx.lineTo(Pos.posX, Pos.posY);
        this.ctx.stroke();
        canvas.posX = Pos.posX;
        canvas.posY = Pos.posY; 
      }

      //-- Position du pointeur --//
      getPosition(e){
        var Rect = canvas.getBoundingClientRect(), /* Méthode qui renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage */
        EventEle = e.changedTouches? e.changedTouches[0]:e;
        return {
          posX : (EventEle.clientX - Rect.left) / (Rect.right - Rect.left) * canvas.width, /*Définit ou renvoie la coordonnée X du pointeur de la souris par rapport au coin supérieur gauche de la zone client de la fenêtre du navigateur.*/
          posY : (EventEle.clientY - Rect.top) / (Rect.bottom - Rect.top) * canvas.height /*Définit ou renvoie la coordonnée Y du pointeur de la souris par rapport au coin supérieur gauche de la zone client de la fenêtre du navigateur.*/
        };
      }

      //-- levé du pointeur --//
      upDraw(e){
        var canvas = e.currentTarget;
        canvas.bDraw = false; 
      }
}
new Canvas();
