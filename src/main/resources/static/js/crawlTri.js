// const backendServer = "http://localhost:8080/";
//Image List for creating crawl product
var imageList = [];
//Image List for editing crawl product
var addedImageList = [];
var imagePos = 0;

$(document).ready(function () {
    $('#example').DataTable();

    CKEDITOR.replace('txtDescription');

    //Load category and image into add crawl product modal
    loadCategory();
    loadBrand();
});

$('#imageUpload').change(function () {
    var filesUpload = document.getElementById("imageUpload");
    var fileList = document.getElementById("imageTableBody");
    traverseFiles(this.files, filesUpload, fileList);
});

//Load the Crawl Product information to the edit Modal
//crawlProduct = {[id, name, price, categoryId, brandId, status]}
function loadModalForEdit(crawlProduct) {
    //clean up modal
    cleanUpEditModal();
    var name = document.getElementById("txtEditName");
}

//Clean up Edit Modal for new information
function cleanUpEditModal() {

}

//Go through selected file, show and add them to global imageArray
function traverseFiles(files, filesUpload, fileList) {
    if (typeof files !== "undefined") {
        for (var i = 0, l = files.length; i < l; i++) {
            uploadFile(files[i], filesUpload, fileList);
            imageList.push(files[i]);
            imagePos++;
        }
    }
    else {
        fileList.innerHTML = "No support for the File API in this web browser";
    }
}

function uploadFile(file, filesUpload, fileList) {
    var tr = document.createElement("tr"),
        nameTd = document.createElement("td"), sizeTd = document.createElement("td"),
        imgTd = document.createElement("td"), btnTd = document.createElement("td"),
        img = document.createElement("img"),
        reader;

    imgTd.style.width = "200px";
    imgTd.style.maxWidth = "200px";
    nameTd.style.verticalAlign = "middle";
    nameTd.style.textAlign = "center";
    sizeTd.style.verticalAlign = "middle";
    sizeTd.style.textAlign = "center";
    btnTd.style.verticalAlign = "middle";
    btnTd.style.textAlign = "center";

    if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
        img = document.createElement("img");
        img.style.width = "100%";
        img.classList.add("img-fluid")

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


    btnTd.innerHTML = "<button class=\"btn btn-danger\" type=\"button\" onclick=" + "deleteImg(this," + imagePos + ')' + ">\n" +
        "<span>Delete</span>\n" +
        "</button>\n";

    //     fileInfo += "<p><strong>Type:</strong> " + file.type + "</p>";

    tr.appendChild(nameTd);
    tr.appendChild(sizeTd);
    tr.appendChild(btnTd);

    fileList.appendChild(tr);

}

function deleteImg(btn, pos) {
    $(btn).closest('tr').remove();
    imageList.splice(pos, 1, null);
}

function validateCreate(){

}

//Submit Function
$('#createForm').submit((function (e) {
    e.preventDefault();
    //get category select
    var categorySelect = document.getElementById('categoryId');
    //get category select value
    var category = parseInt(categorySelect.options[categorySelect.selectedIndex].value);
    //get brand select
    var brandSelect = document.getElementById('brandId');
    //get brand select value
    var brand = parseInt(brandSelect.options[brandSelect.selectedIndex].value);

    var objectData = {
        name : document.getElementById('txtName').value,
        categoryId : category,
        branId : brand,
        price : parseFloat(document.getElementById('txtPrice').value),
        status : 1,
        description : CKEDITOR.instances['txtDescription'].getData(),
    }
    var objectDataString = JSON.stringify(objectData);
    var formData = new FormData();
    formData.append('crawlString', objectDataString);
    console.log("objectDataString: "+ objectDataString);
    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i] !== null) {
            formData.append('images', imageList[i]);
        }
    }

    $.ajax({
        type: "POST",
        url: backendServer + "/api/crawl",
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
}));

// $("#startCrawlRev").click(function () {
//     runCrawl("revzilla");
// });
//
//
// $("#stopCrawlRev").click(function () {
//     stopCrawl("revzilla");
// });

function loadCategory(){
    $.ajax({
        url: backendServer + "api/common/loadCategory",
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var array = response.data;
            if (array != null) {
                for (var i = 0; i < array.length; i++) {
                    $('#categoryId').append('<option value="' + array[i].id + '">' + array[i].name + '</option>');
                    $('#editCategoryId').append('<option value="' + array[i].id + '">' + array[i].name + '</option>');
                }
            }
        },
        error: function (e) {
            alert("ERROR loading category");
        }
    })}

function loadBrand() {
    ($.ajax({
        url: backendServer + "api/common/loadBrand",
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var array = response.data;
            if (array != null) {
                for (var i = 0; i < array.length; i++) {
                    //Populate select field in adding modal
                    $("#brandId").append('<option value="' + array[i].id + '">' + array[i].name + '</option>');
                    //Populate select field in edit modal
                    $("#editBrandId").append('<option value="' + array[i].id + '">' + array[i].name + '</option>');
                }
            }
        },
        error: function (e) {
            alert("ERROR loading brand");
        }
    }));
}

function loadStatus() {
    ($.ajax({
        url: backendServer + "api/common/loadCrawlStatus",
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var array = response.data;
            if (array != null) {
                for (var i = 0; i < array.length; i++) {
                    $("#editStatusId").append('<option value="' + array[i].id + '">' + array[i].name + '</option>');
                }
            }
        },
        error: function (e) {
            alert("ERROR loading crawl status id");
        }
    }));
}