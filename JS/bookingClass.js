class Booking {

  constructor() {
    var prenom = $('#prenom');
    var nom = $('#nom');

    var btnReserver = document.getElementById('reza');
    btnReserver.addEventListener("click", this.checkForm.bind(this));

    this.checkFormName = false;
    this.checkFormLastname = false;
  }

  //------------ Sécuriser le formulaire ------------//
  checkForm(e) {
    var prenom = document.getElementById('prenom');
    var prenom_m = document.getElementById('prenom_manquant');
    var prenom_v = /^[a-zA-ZéèîïËÊÏ][a-zéèêëçîï]+([-'\s][a-zA-ZéèîïËÊÏ][a-zéèêëçîï]+)?/;

    var nom = document.getElementById('nom');
    var nom_m = document.getElementById('nom_manquant');
    var nom_v = /^[a-zA-ZéèîïËÊÏ][a-zéèêëçîï]+([-'\s][a-zA-ZéèîïËÊÏ][a-zéèêëçîï]+)?/;

    var station_m = document.getElementById('detailStations');

    //------------ Sécuriser le prenom et messages d'erreur ------------//
    if (prenom.validity.valueMissing) {
      e.preventDefault();
      prenom_m.textContent = 'Saisissez votre Prénom';
      prenom_m.style.color = 'red';
      prenom_m.style.fontSize = '80%';
      this.checkFormName = false;
    } else {
      if (prenom_v.test(prenom.value) == false) {
        e.preventDefault();
        prenom_m.textContent = 'Format incorrect';
        prenom_m.style.color = 'red';
        prenom_m.style.fontSize = '80%';
        this.checkFormName = false;
      } else {
        this.checkFormName = true;
        prenom_m.textContent = '';
      }
    }

    //------------ Sécuriser le nom et messages d'erreur ------------//
    if (nom.validity.valueMissing) {
      e.preventDefault();
      nom_m.textContent = 'Saisissez votre Nom';
      nom_m.style.color = 'red';
      nom_m.style.fontSize = '80%';
      this.checkFormLastname = false;
    } else {
      if (nom_v.test(nom.value) == false) {
        e.preventDefault();
        nom_m.textContent = 'Format incorrect';
        nom_m.style.color = 'red';
        nom_m.style.fontSize = '80%';
        this.checkFormLastname = false;
      } else {
        this.checkFormLastname = true;
        nom_m.textContent = '';
      }
    }

    //------------ Apparition du canvas après booking ------------//
    if (this.checkFormName == true && this.checkFormLastname == true) {
      this.storageInfos();
      $('#canvas').css('display', 'block');
      $('#boutons').css('display', 'block');
      console.log('reservé');
    }
  }

  //------------ Stockage des infos dans le localStorage ------------//
  storageInfos() {
    localStorage.setItem('prenom', $('#prenom').val());
    localStorage.setItem('nom', $('#nom').val());
    console.log('stocké');
  }
};
new Booking();
