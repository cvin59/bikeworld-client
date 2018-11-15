var imgSeq = 0;
var uploadImgList = [];
var deleteImgList = [];

try {
    CKEDITOR.replace('inputProductDescription');
} catch (e) {
    console.log(e);
}
try {
    CKEDITOR.replace('editProductDescription');
} catch (e) {
    console.log(e);
}

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


function deleteImg(btn, seq) {
    $(btn).closest('tr').remove();
    uploadImgList.splice(seq, 1, null);
}


// Restrict number only
$('#editProductPrice').on("change", function () {
    var val = Math.abs(parseInt(this.value, 10) || 1);
    this.value = val < 1 ? 1 : val;
});

$('#editProductQuantity').on("change", function () {
    var val = Math.abs(parseInt(this.value, 10) || 1);
    this.value = val > 100 ? 99 : val;
});

// Edit Product
$('#edit-product-form').submit(async function (e) {
    e.preventDefault();
    var objectData =
        {
            id: document.getElementById("editProductId").value,
            name: document.getElementById('editProductName').value,
            description: CKEDITOR.instances['editProductDescription'].getData(),
            price: document.getElementById('editProductPrice').value,
            quantity: document.getElementById('editProductQuantity').value,
            address: document.getElementById('editProductAddress').value,
        };

    if ($('#editProductLng').val()!=null && $('#editProductLat').val()!=null){
        objectData =
            {
                id: document.getElementById("editProductId").value,
                name: document.getElementById('editProductName').value,
                description: CKEDITOR.instances['editProductDescription'].getData(),
                price: document.getElementById('editProductPrice').value,
                quantity: document.getElementById('editProductQuantity').value,
                address: document.getElementById('editProductAddress').value,
                longtitude: $('#editProductLng').val(),
                latitude: $('#editProductLat').val(),
            };
    }

    var objectDataString = JSON.stringify(objectData);
    var formData = new FormData();
    formData.append("productModelString", objectDataString);

    var deleteImgJson = JSON.stringify(deleteImgList);

    formData.append("deleteImgList", deleteImgList);

    for (i = 0; i < uploadImgList.length; i++) {
        if (uploadImgList[i] != null) {
            formData.append('images', uploadImgList[i]);
        }
    }
    $.ajax({
        type: "PUT",
        url: backendServer + "/api/product",
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            alert(res.message);
        },
        error: function (res) {
            alert(res.message);
        }
    });
});


function showStatus(stat, i, location) {
    var statusId = stat.statusId;
    var status = stat.status;


    switch (statusId) {
        case 1:
            $(location).addClass("badge badge-success");
            break;
        case 2:
            $(location).addClass("badge badge-warning");
            break;
        case 3:
            $(location).addClass("badge badge-info");
            break;
        case 4:
            $(statusDiv).class = "badge badge-light";
            break;
    }

    $(location).append(status);
}

function showStars(rate, rater, rating) {
    var star = rate / rater;
    var stars = "";
    for (i = 0; i <= 4; i++) {
        if (star <= i) {
            stars = stars + "<i class=\"fa fa-star-o\"> </i>";
        }

        if (star > i && star < i + 1) {
            stars = stars + "<i class=\"fa fa-star-half-o\">";
        }

        if (star >= i + 1) {
            stars = stars + ("<i class=\"fa fa-star\"></i>");
        }
    }
    $(rating).html(stars);
};

function showEditPage(seq) {
    var product = JSON.parse(localStorage.getItem('sellProduct-' + seq));
    $("#editProductName").val(product.name);
    $("#editProductAddress").val(product.address);
    $("#editProductPrice").val(product.price);
    $("#editProductQuantity").val(product.quantity);

    // CKEDITOR.instances.editProductDescription.setData(product.description);

    var images = product.images;
    var imageId = product.ProductImgId;

    $("#edit-image-table tr").remove();
    var fileList = document.getElementById("edit-file-list");
    deleteImgList = [];

    for (i = 0; i < images.length; i++) {
        showEditImage(images[i], imageId[i], fileList);
    }
}

function showEditImage(image, imageId, fileList) {
    var tr = document.createElement("tr"),
        nameTd = document.createElement("td"), sizeTd = document.createElement("td"),
        imgTd = document.createElement("td"), btnTd = document.createElement("td"),
        img = document.createElement("img");

    img.width = 200;
    img.height = 100;
    img.border = 1;
    img.src = backendServer + image;

    tr.appendChild(imgTd);
    imgTd.appendChild(img);

// Present file info and append it to the list of files
    nameTd.innerHTML = image.split('/')[2];

    btnTd.innerHTML = "<button class=\"btn-outline-danger\" type=\"button\" onclick='deleteOriginImg(this" + ',' + imageId + ")'\n" +
        "<span>Delete</span>\n" +
        "</button>\n";

    //     fileInfo += "<p><strong>Type:</strong> " + file.type + "</p>";

    tr.appendChild(nameTd);
    tr.appendChild(sizeTd);
    tr.appendChild(btnTd);

    fileList.appendChild(tr);
}

function deleteOriginImg(btn, id) {
    $(btn).closest('tr').remove();
    deleteImgList.push(id);
}

$("#edit-files-upload").change(function () {
    var edtFilesUpload = document.getElementById("edit-files-upload");
    var edtFileList = document.getElementById("edit-file-list");
    traverseFiles(this.files, edtFilesUpload, edtFileList);
})
$("#btn-close").click(function () {
    window.location.replace("/user/product");
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
        /** @type {!HTMLInputElement} */(document.getElementById('editProductAddress')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.table(place);
    $("#editProductLat").val(place.geometry.location.lat());
    $("#editProductLng").val(place.geometry.location.lng());

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


$("#editProductAddress").on("focus", function () {
    geolocate();
})



$("#btn-close").click(function () {
    window.location.replace("/user/product");
})