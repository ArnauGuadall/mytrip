// Google Maps API

var geocoder = new google.maps.Geocoder();
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var locations = [];
var orderCount = 0;

// IronhackBCN Location by default 
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 10,  
  center: new google.maps.LatLng(41.3977381, 2.090471916),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

function initialize() {  

  directionsDisplay = new google.maps.DirectionsRenderer();

  directionsDisplay.setMap(map);

  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  var request = {
    travelMode: google.maps.TravelMode.DRIVING
  };

  console.log("location length is.. " + locations.length);

  if (locations.length > 0){
    // Go though the array and place a marker on the map base on location array
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));

      if (i == 0) request.origin = marker.getPosition();
      else if (i == locations.length - 1) request.destination = marker.getPosition();
      else {
        if (!request.waypoints) request.waypoints = [];
        request.waypoints.push({
          location: marker.getPosition(),
          stopover: true
        });
      }
    }

    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
    // End
  } else {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function (position) {

        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        map.setCenter(center);
        
      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }
    
}

// waits until the user clicks the button and execute the geocodeAddres function
document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  }); 

// GEOCODE Get the input from address and find a place with that name and push it to an array
  function geocodeAddress(geocoder, resultsMap) {
    
	  var address = document.getElementById('address').value;
	  
	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === 'OK') {
	      resultsMap.setCenter(results[0].geometry.location);
	      var marker = new google.maps.Marker({
	        map: resultsMap,
	        position: results[0].geometry.location
        });        

        var lat = results[0].geometry.location.lat()
        var lng = results[0].geometry.location.lng()

        locations.push(
          [address, lat, lng, orderCount]
        );

        orderCount++;
        console.log("The orderCount is: " + orderCount);
    
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
      }
          
      initialize();
    });
      
    console.log(locations);
  } 
  //End GEOCODE
  
google.maps.event.addDomListener(window, 'load', initialize);
