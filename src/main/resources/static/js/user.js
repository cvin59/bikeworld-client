$(function () {
    var username = localStorage.getItem("username");
    $("#edtUsername").val(username);

    $.ajax({
        type: 'GET',
        url: backendServer + "/api/account/profile/" + username,
        dataType: 'json',
        success(res) {
            if (res.data != null) {
                $("#edtFirstname").val(res.data.firstName);
                $("#edtLastname").val(res.data.lastName);
                $("#edtEmail").val(res.data.email);
                $("#edtPhone").val(res.data.phone);
                $("#edtLocation").val(res.data.address);
                $("#imagePreview").css('background-image', 'url(' + backendServer+res.data.avatarLink +')');
            }
        },
        error(e) {
            console.log(e);
        }
    });
});

$("#edt-profile-form").submit(function (e) {
    e.preventDefault();
    var objectData = {
        lastname: $("#edtLastname").val(),
        firstname: $("#edtFirstname").val(),
        accountUser: $("#edtUsername").val(),
        email: $("#edtEmail").val(),
        address: $("#edtLocation").val(),
        phone: $("#edtPhone").val(),

    }

    var objectDataString = JSON.stringify(objectData);
    var fileUpload = $("#imageUpload").get(0).files[0];

    var formData = new FormData();
    formData.append('profileModelString', objectDataString);
    formData.append('avatar', fileUpload);

    $.ajax({
        type: 'PUT',
        url: backendServer + "/api/account/profile/edit",
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,

        success: function (response) {
            alert("Success")
        },
        error: function (e) {
            alert("ERROR load: ", e);
            console.log(e);
        }
    });
})

function initialize() {
    initAutocomplete();
}

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('edtLocation')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

    initMap();
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());


        });
    }
}

$("#edtLocation").on("focus", function () {
    geolocate();
})