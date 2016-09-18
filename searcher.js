$(document).ready(


    function getLocat() {

        $.getJSON("https://freegeoip.net/json/", function(data) {
            var lat = data['latitude'];
            var long = data['longitude'];

            var meteorObject;

            function finder(lat, long) {
                for (i = 100000; i < 40000000; i = i + 100000) {
                    var url = "https://data.nasa.gov/resource/y77d-th95.json?$where=within_circle(geolocation,%20" + lat + ",%20" + long + ',%20' + i + ")"
                    var emptyArr = [];

                    $.ajax({
                        url: url,
                        async: false,
                        dataType: 'json',
                        success: function(data) {
                            if (data[0] != emptyArr[0]) {
                                i = 40000000;
                                meteorObject = data
                            }
                        }
                    });
                }
            }

            finder(lat, long)
            var meteorCoords = [];
            meteorCoords.push(meteorObject[0]['reclat']);
            meteorCoords.push(" " + meteorObject[0]['reclong']);


            document.getElementById("coord").innerHTML = meteorCoords;
            document.getElementById("name").innerHTML = meteorObject[0]['name'];
            var year = meteorObject[0]['year'];
            if(year != undefined){
              year = year.substring(0,4);
              document.getElementById("year").innerHTML = year;
            } else {
              document.getElementById("year").innerHTML = "Date Not Available";
            }
            var mass = meteorObject[0]['mass'];
            if(mass != undefined){
              document.getElementById("mass").innerHTML = meteorObject[0]['mass']
            } else {
                document.getElementById("mass").innerHTML = "Mass Not Available";
            }
            var type = meteorObject[0]["recclass"];
            if(type != undefined){
              document.getElementById("rockType").innerHTML = type;
            } else {
              document.getElementById("rockType").innerHTML = "Rock Type Not Available";
            }



            var marker;
            function initMap2() {
              var myLatLong = {lat: parseInt(meteorCoords[0]), lng: parseInt(meteorCoords[1])};
              var trueLatLong = {lat: lat, lng: long};
              map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLong,
                zoom: 8,

                styles: [
            {
              featureType: 'all',
              stylers: [
                { saturation: -80 }
              ]
            },{
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                { hue: '#00ffee' },
                { saturation: 50 }
              ]
            },{
              featureType: 'poi.business',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            }
          ]
              });
              marker = new google.maps.Marker({
                position: trueLatLong,
                map: map,
                title: "City",
                label: "A",
                animation: google.maps.Animation.DROP

              });
              marker.addListener('click', toggleBounce);

              marker2 = new google.maps.Marker({
                position: myLatLong,
                map: map,
                title: "Meteorite",
                label: "B",
                animation: google.maps.Animation.DROP

              });
              marker2.addListener('click', toggleBounce2);

              var path = [
                {lat: parseInt(meteorCoords[0]), lng: parseInt(meteorCoords[1])},
                {lat: lat, lng: long}
              ];

              var finalPath = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
              })
              finalPath.setMap(map);
            }

            function toggleBounce() {
              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
            function toggleBounce2() {
              if (marker2.getAnimation() !== null) {
                marker2.setAnimation(null);
              } else {
                marker2.setAnimation(google.maps.Animation.BOUNCE);
              }
            }




            initMap2();


        });
    }
  )
  function changeCity() {
    var city = document.getElementById("userInput").value;
    city = city.replace(/\s+/g, '');
    city = city.toLowerCase()
    var cityCoord = [];
    function cityToCoordinates(city){
      url = 'https://api.opencagedata.com/geocode/v1/json?q=' + city + '&key=f8157dec35f4eb2994124446975a753e'
      $.ajax({
          url: url,
          async: false,
          dataType: 'json',
          success: function(data) {
            cityCoord.push(data['results'][0]['bounds']['northeast']['lat']);
            cityCoord.push(data['results'][0]['bounds']['northeast']['lng']);
          }
      });
    }
      cityToCoordinates(city);
      if(cityCoord[0] === undefined) {
          document.getElementById('badcity').innerHTML = "Bad City Request, Please Try Again";
          return;
        }else {
          document.getElementById('badcity').innerHTML = "";


      }
    function getLocat2(cityCoord) {

        $.getJSON("https://freegeoip.net/json/", function(data) {
            var lat = cityCoord[0];
            var long = cityCoord[1];
            var meteorObject;

            function finder(lat, long) {
                for (i = 100000; i < 40000000; i = i + 100000) {
                    var url = "https://data.nasa.gov/resource/y77d-th95.json?$where=within_circle(geolocation,%20" + lat + ",%20" + long + ',%20' + i + ")"
                    var emptyArr = [];

                    $.ajax({
                        url: url,
                        async: false,
                        dataType: 'json',
                        success: function(data) {
                            if (data[0] != emptyArr[0]) {
                                i = 40000000;
                                meteorObject = data
                            }
                        }
                    });
                }
            }

            finder(lat, long)
            var meteorCoords = [];
            meteorCoords.push(meteorObject[0]['reclat']);
            meteorCoords.push(" " + meteorObject[0]['reclong']);


            document.getElementById("coord").innerHTML = meteorCoords;
            document.getElementById("name").innerHTML = meteorObject[0]['name'];
            var year = meteorObject[0]['year'];
            if(year != undefined){
              year = year.substring(0,4);
              document.getElementById("year").innerHTML = year;
            } else {
              document.getElementById("year").innerHTML = "Date Not Available";
            }
            var mass = meteorObject[0]['mass'];
            if(mass != undefined){
              document.getElementById("mass").innerHTML = meteorObject[0]['mass'];
            } else {
                document.getElementById("mass").innerHTML = "Mass Not Available";
            }
            var type = meteorObject[0]["recclass"];
            if(type != undefined){
              document.getElementById("rockType").innerHTML = type;
            } else {
              document.getElementById("rockType").innerHTML = "Rock Type Not Available";
            }



            var marker;
            function initMap2() {
              var myLatLong = {lat: parseInt(meteorCoords[0]), lng: parseInt(meteorCoords[1])};
              var trueLatLong = {lat: lat, lng: long};

              map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLong,
                zoom: 8,

                styles: [
            {
              featureType: 'all',
              stylers: [
                { saturation: -80 }
              ]
            },{
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                { hue: '#00ffee' },
                { saturation: 50 }
              ]
            },{
              featureType: 'poi.business',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            }
          ]
              });

              marker = new google.maps.Marker({
                position: trueLatLong,
                map: map,
                title: "City",
                animation: google.maps.Animation.DROP

              });
              marker.addListener('click', toggleBounce);

              marker2 = new google.maps.Marker({
                position: myLatLong,
                map: map,
                title: "Asteroid",
                animation: google.maps.Animation.DROP

              });
              marker2.addListener('click', toggleBounce2);

              var path = [
                {lat: parseInt(meteorCoords[0]), lng: parseInt(meteorCoords[1])},
                {lat: lat, lng: long}
              ];

              var finalPath = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
              })
              finalPath.setMap(map);
            }

            function toggleBounce() {
              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
            function toggleBounce2() {
              if (marker2.getAnimation() !== null) {
                marker2.setAnimation(null);
              } else {
                marker2.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
            initMap2();



        });
    }
  getLocat2(cityCoord);

}
