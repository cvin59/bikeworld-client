$("#btnCurrentAddr").click(function () {
    getLocation();
})

function getLocation() {
    console.log("Entering getLocation()");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            displayCurrentLocation,
            displayError,
            {
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: true
            });
    } else {
        console.log("Oops, no geolocation support");
    }
    console.log("Exiting getLocation()");
};

function displayCurrentLocation(position) {
    console.log("Entering displayCurrentLocation");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude " + latitude + " Longitude " + longitude);
    getAddressFromLatLang(latitude, longitude);
    console.log("Exiting displayCurrentLocation");
}

function displayError(error) {
    console.log("Entering ConsultantLocator.displayError()");
    var errorType = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request time out"
    };
    var errorMessage = errorType[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + "  " + error.message;
    }
    alert("Error Message " + errorMessage);
    console.log("Exiting ConsultantLocator.displayError()");
}

function getAddressFromLatLang(lat, lng) {
    console.log("Entering getAddressFromLatLang()");
    var geocoder = new google.maps.Geocoder();
    var latLng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latLng}, function (results, status) {
        console.log("After getting address");
        console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                console.log(results[1]);
                $("#inputProductAddress").val(results[1].formatted_address);
                $("#inputProductLat").val(lat);
                $("#inputProductLng").val(lng);
            }
        } else {
            alert("Geocode was not successful" + status);
        }
    });
    console.log("Entering getAddressFromLatLang()");
}