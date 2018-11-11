var imgSeq = 0;
var uploadImgList = [];
var addrLat=0;
var addrLng=0;

try {
    CKEDITOR.replace('inputProductDescription');
} catch (e) {
    console.log(e);
}

$.ajax({
    url: backendServer + "/api/common/loadBrand",
    dataType: 'json',
    type: 'GET',
    success: function (response) {
        var array = response.data;
        if (array != '') {
            var selectBox = document.getElementById("inputProductBrand");
            for (i = 0; i < array.length; i++) {
                var o = new Option(array[i].name, array[i].id);
                $(o).html(array[i].name);
                $("#inputProductBrand").append(o);
            }
        }
    },
    error: function (e) {
        alert("ERROR load: ", e);
    }
}).done($.ajax({
    url: backendServer + "/api/common/loadCategory",
    dataType: 'json',
    type: 'GET',
    success: function (response) {
        var array = response.data;
        if (array != '') {
            var selectBox = document.getElementById("inputProductCategory");
            for (i = 0; i < array.length; i++) {
                var o = new Option(array[i].name, array[i].id);
                $(o).html(array[i].name);
                $("#inputProductCategory").append(o);
            }
        }
    },
    error: function (e) {
        alert("ERROR load: ", e);
    }
}));

function uploadFile(file, filesUpload, fileList) {
    var tr = document.createElement("tr"),
        nameTd = document.createElement("td"), sizeTd = document.createElement("td"),
        imgTd = document.createElement("td"), btnTd = document.createElement("td"),
        img = document.createElement("img"),
        reader;

    if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
        img = document.createElement("img");
        img.width = 200;
        img.height = 100;
        img.border = 1;

        tr.appendChild(imgTd);
        imgTd.appendChild(img);

        reader = new FileReader();

        reader.onload = (function (theImg) {

            return function (evt) {
                theImg.src = evt.target.result;
            };
        }
        (img));
        reader.readAsDataURL(file);
    }

// Present file info and append it to the list of files
    nameTd.innerHTML = file.name;
    sizeTd.innerHTML = parseInt(file.size / 1024, 10) + " Kb";


    btnTd.innerHTML = "<button class=\"btn-outline-danger\" type=\"button\" onclick=" + "deleteImg(this," + imgSeq + ')' + ">\n" +
        "<span>Delete</span>\n" +
        "</button>\n";

    //     fileInfo += "<p><strong>Type:</strong> " + file.type + "</p>";

    tr.appendChild(nameTd);
    tr.appendChild(sizeTd);
    tr.appendChild(btnTd);

    fileList.appendChild(tr);

}

function traverseFiles(files, filesUpload, fileList) {
    if (typeof files !== "undefined") {
        for (var i = 0, l = files.length; i < l; i++) {
            uploadFile(files[i], filesUpload, fileList);
            uploadImgList.push(files[i]);
            imgSeq++;
        }
    }
    else {
        fileList.innerHTML = "No support for the File API in this web browser";
    }
}

$('#create-files-upload').change(function () {
    var filesUpload = document.getElementById("create-files-upload");
    var fileList = document.getElementById("create-file-list");
    traverseFiles(this.files, filesUpload, fileList);
});

$("#btnClear").click(function () {
    $("#image-table tr").remove();
    imgSeq = 0;
    uploadImgList = [];
})

function deleteImg(btn, seq) {
    $(btn).closest('tr').remove();
    uploadImgList.splice(seq, 1, null);
}

// Restrict number only
$('#inputProductPrice').on("change", function () {
    var val = Math.abs(parseInt(this.value, 10) || 1);
    this.value = val < 1 ? 1 : val;
});

$('#inputProductQuantity').on("change", function () {
    var val = Math.abs(parseInt(this.value, 10) || 1);
    this.value = val > 100 ? 99 : val;
});

//Create Product
$('#create-product-form').submit(async function (e) {
    e.preventDefault();
    var cate = document.getElementById("inputProductCategory");
    var brand = document.getElementById("inputProductBrand");
    var objectData =
        {
            name: document.getElementById('inputProductName').value,
            description: CKEDITOR.instances['inputProductDescription'].getData(),
            price: document.getElementById('inputProductPrice').value,
            quantity: document.getElementById('inputProductQuantity').value,
            address: document.getElementById('inputProductAddress').value,
            seller: localStorage.getItem("username"),
            categoryId: cate.options[cate.selectedIndex].value,
            brandId: brand.options[brand.selectedIndex].value,
            longtitude: $('#inputProductLng').val(),
            latitude: $('#inputProductLat').val(),
        };
    var objectDataString = JSON.stringify(objectData);

    var formData = new FormData();

    formData.append('productModelString', objectDataString);
    for (i = 0; i < uploadImgList.length; i++) {
        if (uploadImgList[i] != null) {
            formData.append('images', uploadImgList[i]);
        }
    }

    $.ajax({
        type: "POST",
        url: backendServer + "/api/product",
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function () {
            alert('Success');
        },
        error: function (e) {
            console.log(e);
        }
    });
});

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

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
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('inputProductAddress')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

    initMap();
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.table(place);
    $("#inputProductLat").val(place.geometry.location.lat());
    $("#inputProductLng").val(place.geometry.location.lng());

    // for (var component in componentForm) {
    //     document.getElementById(component).value = " ";
    //     document.getElementById(component).disabled = false;
    // }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    // for (var i = 0; i < place.address_components.length; i++) {
    //     var addressType = place.address_components[i].types[0];
    //     if (componentForm[addressType]) {
    //         var val = place.address_components[i][componentForm[addressType]];
    //         document.getElementById(addressType).value = val;
    //     }
    // }
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


$("#inputProductAddress").on("focus", function () {
    geolocate();
})

$("#btn-GGmap").click(function () {
    // $('#ggMapModel').modal();
    // initMap();
})


var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}


$( "#btnCurrentAddr" ).click( function(e) {
    e.preventDefault();

    /* Chrome need SSL! */
    var is_chrome = /chrom(e|ium)/.test( navigator.userAgent.toLowerCase() );
    var is_ssl    = 'https:' == document.location.protocol;
    if( is_chrome && ! is_ssl ){
        return false;
    }

    /* HTML5 Geolocation */
    navigator.geolocation.getCurrentPosition(
        function( position ){ // success cb

            /* Current Coordinate */
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var google_map_pos = new google.maps.LatLng( lat, lng );

            /* Use Geocoder to get address */
            var google_maps_geocoder = new google.maps.Geocoder();
            google_maps_geocoder.geocode(
                { 'latLng': google_map_pos },
                function( results, status ) {
                    if ( status == google.maps.GeocoderStatus.OK && results[0] ) {
                        console.log( results[0].formatted_address );
                    }
                }
            );
        },
        function(){ // fail cb
        }
    );
});