class Validate{

      constructor(){
        this.timerOff = false;
        $('#btValider').click(this.validate.bind(this)); 

         //----------- concerver les ID dans le formulaire -----------------------//
        if (localStorage.getItem('prenom') && localStorage.getItem('nom')){
           $('#prenom').val(localStorage.getItem('prenom'));
           $('#nom').val(localStorage.getItem('nom'));
        }

      //---------- rafraichissement de la page en concervant affiché le contenu stocké -----------//
        window.onload = () =>{
            if(sessionStorage.getItem('minutes') && sessionStorage.getItem('secondes')){
              this.minutes = sessionStorage.getItem('minutes');
              this.secondes = sessionStorage.getItem('secondes');
              this.timer();
            }
        }
      }

      //--------------------------- timer -------------------------//
      timer(){
        this.interval = window.setInterval(() => {          
          sessionStorage.setItem('minutes', this.minutes);
          sessionStorage.setItem('secondes', this.secondes);

           /*-----------   ------------*/
          if(this.minutes == 0 && this.secondes == 0){
            clearInterval(this.interval);
            this.timerOff = true; /* */
            sessionStorage.removeItem('minutes');//Effacer les items de la session une fois le Timer à zero//
            sessionStorage.removeItem('secondes');//Effacer les items de la session une fois le Timer à zero//
          }else if(this.secondes == 0 && this.minutes > 0){
            this.minutes--;
            this.secondes = 59;
          }else{
            this.secondes--;
          }

          /*------  -------*/
          if (this.timerOff == false){ /* Si Timer toujours actif */
            if (this.minutes > 0 && this.minutes < 10){
              this.zeroMinute = '0';/*Astuce permettant d'ajouter un zero à la minute du Timer */
            } else {
              this.zeroMinute = '';
            }
            if (this.secondes < 10){
              this.zeroSeconde = '0';/*Astuce permettant d'ajouter un zero à la seconde du Timer */
            } else {
              this.zeroSeconde = '';
            }          
              this.showInfos();
          }else { /* Sinon Timer plus actif */
            this.bookingOver();
            clearInterval(this.interval);
          }
        },1000); /* SetInterval 1 seconde */
      }

      // --------------- Récupérationb des Items stokés et affichage ---------------//
      showInfos(){
        $("#bandeauInfos").text(" Vous avez une réservation au nom de"+ " " +localStorage.prenom+ " " +localStorage.nom+ " "+
              "à la station"+ " " +sessionStorage.nomStation+ " " +"Votre réservation sera annulée dans"+ " " +this.zeroMinute+this.minutes+":"+this.zeroSeconde+this.secondes);  
      }
      bookingOver(){
        $("#bandeauInfos").css({'color': 'red', 'fontSize':'auto'}).text("Désolé, 20 minutes sont écoulés et votre réservation à la station" + " "+sessionStorage.nomStation + " vient d'être annulée !");
      }
      validate(){
        clearInterval(this.interval);
        this.minutes = 20;
        this.secondes = 0;
        this.timer();
        sessionStorage.setItem('nomStation', sessionStorage.getItem('nomstationProvisoire'));
    }
}
new Validate();
