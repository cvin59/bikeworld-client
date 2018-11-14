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
    var objectDataString = JSON.stringify(objectData);
    var formData = new FormData();
    formData.append("productModelString", objectDataString);

    var deleteImgJson = JSON.stringify(deleteImgList);
    alert(deleteImgJson);

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