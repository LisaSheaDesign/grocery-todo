getTodoLocation();

 function getTodoLocation() {
 
 //~~~~~~~~ GeolocationGet location of todoItems   
        navigator.geolocation.getCurrentPosition(getLocation, locationError); // add locationError as an argument
//Get map
}

function getLocation(position) {
     var latitude = position.coords.latitude;
     var longitude = position.coords.longitude;
     
      // Global variable for geo location forgetFormData Function
      geoLocation = "Location: " + "(" + latitude + ", " + longitude + ")" + " ";
    
   //added google map api to show map
   if (!map) {
        showMap(latitude, longitude);
    }
    
    //adding a marker to map
     addMarker(latitude, longitude);
}

function addMarker(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var markerOptions = {
        position: googleLatLong,
        map: map,
        title: "You are here!"
    }
    var marker = new google.maps.Marker(markerOptions);
}

//funciton to show map
function showMap(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var mapOptions = {
        zoom: 12,
        center: googleLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    map.panTo(googleLatLong);
}

//add location error if local can't be found or denied

function locationError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " " + error.message;
    }
    console.log(errorMessage);
    alert(errorMessage);
}

// ~~~~~~~~ Geolocation ENDeolocation END