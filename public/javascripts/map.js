// Google Maps API

var locations = [];
var wayPoints = [];
var orderCount = 0;
var geocoder;
var map;

function addingWayPoints() {

    if (locations.length > 0) {
        wayPoints = []

        for (i = 0; i < locations.length; i++) {
            if (i > 0 && i < locations.length) {
                // create all the points in between from origin to ending
                wayPoints.push({
                    location: locations[i].address,
                    stopover: true
                });
            }
        }
    }

    if (locations.length > 1) {

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();

        // get the configuration of the route and display it on the map
        calculateAndDisplayRoute(directionsService, directionsDisplay)
    }

}

function initialize() {

    geocoder = new google.maps.Geocoder();

    var input = document.getElementById("address")
    var autocomplete = new google.maps.places.Autocomplete(input)

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(41.3977381, 2.090471916),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // waits until the user clis the button and execute the geocodeAddres function
    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);



    });

    // GEOCODE Get the input from address and find a place with that name and push it to an array
    function geocodeAddress(geocoder, resultsMap) {

        var address = document.getElementById('address').value;

        geocoder.geocode({ 'address': address }, (results, status) => {
            if (status === 'OK') {

                resultsMap.setCenter(results[0].geometry.location);

                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });

                var lat = results[0].geometry.location.lat()
                var lng = results[0].geometry.location.lng()

                locations.push({ address, lat, lng, orderCount });

                //adding waypoints to the route
                addingWayPoints()

                orderCount++;

                console.log('------------------------------------');
                var refID = window.location.pathname.split("/")[2];
                console.log('------------------------------------');

                console.log("weWAEWAdWAdd");
                // e.preventDefault();
                $.ajax({
                    global: false,
                    type: 'POST',
                    url: '/trip/' + refID + '/activities', // missing quotes  
                    dataType: 'html',
                    data: {
                        date: $("#date").val(),
                        category: $('input[name="category"]:checked').val(),
                        price: $("#price").val(),
                        notes: $("#notes").val(),
                        location_name: address,
                        lat: lat,
                        lng: lng,
                        tripid: refID,
                    },
                    success: function(post) {
                        // console.log(result);
                        console.log("pooooooooooooooooost", JSON.parse(post))
                        post = JSON.parse(post)

                        $(".newRecord").append("<div class='col-md-6 col-sm-12 col-xs-12 content-left'><div class='format_div'> \
                  <p><i class='material-icons'>event_note</i> " + post["date"] + " </p> \
                  <p class='bigger'><i class='material-icons'>add_location</i> " + post["location"] + " </p> \
                  <p class='bigger'><i class='material-icons'>chat</i> " + post["text"] + " </p> \
                  <div class='tag'> \
                  <p class='left'><i class='material-icons'>label</i> " + post["category"] + "  </p> \
                  <p class='right'><i class='material-icons'>monetization_on</i> " + post["price"] + " €  </p> \
                  </div></div>");
                    },
                    error: function(request, status, error) {
                        serviceError();
                    }
                });


            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }

        });

    }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    directionsDisplay.setMap(map);

    directionsService.route({
        origin: { lat: locations[0].lat, lng: locations[0].lng },
        destination: { lat: locations[locations.length - 1].lat, lng: locations[locations.length - 1].lng },
        waypoints: wayPoints,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

$(document).ready(function() {
    initialize()
})
