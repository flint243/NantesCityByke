class SlideShow{

		    //------ changement automatique ---------//
        constructor(){
          this.myPix = ['Images/slider/nantes10.png','Images/slider/nantes7.png','Images/slider/nantes3.png','Images/slider/nantes6.png','Images/slider/nantes8.png'];
          
          this.textImg = ['Bienvenue sur notre site de location de vélos.<br> Cliquez sur un marqueur pour afficher les stations disponibles de la zone.'
          ,'Sélectionnez une station pour afficher ses informations<br> et commencer votre réservation en cliquant sur "Réserver".', 
          'Après avoir signé, confirmez votre réservation en cliquant sur "Valider".',
          'Votre vélo est réservé pour une période de 20 minutes, mais vous pouvez l\'annuler à tout moment.', 
          'Nantes City Bike vous souhaites une bonne ballade !'];

          this.speed = 5000; //vitesse de defilement en milliseconds
          this.i = 1;
          this.interval = 0;

          $('#slider').children('img').attr('src', this.myPix[0]);
          $('#btRight').click(this.next.bind(this));
          $('#btLeft').click(this.prev.bind(this));

          $('#btnStop').click(this.stop.bind(this));
          $('#btnPlay').click(this.play.bind(this));

          this.slideShowAuto();
        }
 
        slideShowAuto(){
          this.interval = setInterval(()=>{this.next(); 
          }, this.speed);
        }

        //------------ fonction next() assure l'automatisme du slider ------------//
        next(){
            $('#slider').children('img').attr('src', this.myPix[this.i]);
            $('#infoSlider').css({'fontSize':'1em'}).html(this.textImg[this.i]);
            this.i += 1; // Augmenter l'index
            if( this.i == this.myPix.length){
              this.i = 0;
            }
        }
        prev(){
            $('#slider').children('img').attr('src', this.myPix[this.i]);
            $('#infoSlider').html(this.textImg[this.i]);
            this.i -= 1; // baisser l'index
            if( this.i == this.myPix.length){
              this.i = 0;
            }
        }

        stop(){
           clearInterval(this.interval);
        }

        play(){
          this.slideShowAuto();
        }
}
new SlideShow();
