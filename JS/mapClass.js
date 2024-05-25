class Map {

  constructor() {
    this.showMarkers(this.initMap());
  }

  //---------------INITIALISATION MAP LEAFLET------------------//
  initMap() {
    var map=L.map('map').setView([47.2184702, -1.5544100], 13)
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png?access_token={accessToken}', {
      // Il est toujours bien de laisser le lien vers la source des données
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20,
      accessToken: 'pk.eyJ1IjoibWljaGFlbGdvZGluaG8iLCJhIjoiY2p3Z3Jld3g1MDFqaTQ4bXY2aGc4NDhhMSJ9.mB4t1fdsKm3b0UwSvBxoCw',
    }).addTo(map);
    return map;
  }

  //---------------APPEL AJAX------------------//
  showMarkers(map) {
    let maRequet=new XMLHttpRequest();
    maRequet.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=2b6d02bd4c1ebd0d0e42089aaab7adc3cf5f0523");
    maRequet.addEventListener('load', function () {

      //--------------TEST LE STATUS--------------//
      if (maRequet.status>=200&&maRequet.status<400) {
        ma_callback(maRequet.responseText);
      } else {
        ma_callback(maRequet.status);
      }
    })
    maRequet.addEventListener('error', function () {
      console.log("erreur de connexion");
    });
    maRequet.send(null);

    //--------------RECUPERER LA REPONSE----------------//
    function ma_callback(reponse) {
      reponse=JSON.parse(reponse);
      reponse.forEach(function (station) {
        L.marker([station.position.lat, station.position.lng]).on('click', afficherInfos).bindPopup(station.name).addTo(map);

        //---------------AFFICHER LES RESULTATS-----------//
        var nomStation=station.name;
        var adresseStation=station.address;
        var veloDispo=station.available_bikes;

        function afficherInfos() {
          $(".nomstation").text("Vous consultez la station:"+" "+nomStation);
          $(".adressestation").text(""+adresseStation);
          $(".velodispo").text("Il y a actuellement"+" "+veloDispo+" "+"vélo(s) disponible(s).");
          sessionStorage.setItem('nomstationProvisoire', nomStation);
          console.log(nomStation);
        }
      })
    }
  }

};
new Map();
