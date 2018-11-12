// let backendServer = "http://localhost:8080/";
//Image List for creating crawl product
var imageList = [];
//Image List for editing crawl product
var addedImageList = [];
//Image of deleted images for editing crawl product
var deletedImageList = [];
var imagePos = 0;
var editImagePos = 0;

$(document).ready(function () {
    //Replace table with data table
    $('#example').DataTable();

    //Replace text areas with CKEDITOR
    CKEDITOR.replace('txtDescription');
    CKEDITOR.replace('txtEditDescription')

    //Load category, status and brand in forms
    loadCategory();
    loadBrand();
    loadStatus();
});

//Add form image upload listener
$('#imageUpload').change(function () {
    var filesUpload = document.getElementById("imageUpload");
    var fileList = document.getElementById("imageTableBody");
    traverseFiles(this.files, filesUpload, fileList, "add");
});

//Edit form image upload listener
$('#imageEditUpload').change(function () {
    var filesUpload = document.getElementById("imageEditUpload");
    var fileList = document.getElementById("imageEditTableBody");
    traverseFiles(this.files, filesUpload, fileList, "edit");
});

//Prepare information for edit form
function loadModalFromProductModel(product) {
    //clean up modal
    cleanUpEditModal();

    $("#editId").val(product.id);
    console.log(product.id);
    $('#txtEditName').val(product.name);
    $('#txtEditPrice').val(product.price);
    CKEDITOR.instances['txtEditDescription'].setData(product.description);
    $('#editStatusId').val(product.status.id);
    $('#editCategoryId').val(product.categoryId.id);
    $('#editBrandId').val(product.brandId.id)
}

//Clean up Edit Modal for new information
function cleanUpEditModal() {
    $('#txtEditName').val('');
    $('#imageEditUpload').val('');
    $('#txtEditPrice').val(0);
    $('#txtEditDescription').val('');
    $('#editStatusId').val(1);
    $('#editCategoryId').val(1);
    $('#editBrandId').val(1)
    $("#imageEditTable").find("tr:gt(0)").remove();

    //cleanup image lists for editing
    addedImageList = [];
    deletedImageList = [];
    editImagePos = 0;

    var nameMessage = document.getElementById("editMessageName"),
        priceMessage = document.getElementById("editMessagePrice");

    hideMessage(nameMessage);
    hideMessage(priceMessage);
}

//Load the Crawl Product information to the edit Modal
//crawlProduct = {[id, name, price, categoryId, brandId, status]}
function loadModalForEdit(crawlProductId) {
    $.ajax({
        url: backendServer + "api/crawl/"+ crawlProductId,
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var product = response.data;
            if (product != null) {
                loadModalFromProductModel(product);
            }
        },
        error: function (e) {
            alert("ERROR loading category");
        }
    });

    //Load all images of product for editing
    $.ajax({
        url: backendServer + "api/crawl-image/crawl/"+ crawlProductId,
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var images = response.data;
            if (images != null) {
                loadImagesForEdit(images);
            }
        },
        error: function (e) {
            alert("ERROR loading images for editing");
        }
    });
}

//Load all images of product for editing
function loadImagesForEdit(images) {
    //get table body
    var tableBoby = document.getElementById("imageEditTableBody")

    for(var i = 0; i<images.length; i++){
        var tr = document.createElement("tr"),
            nameTd = document.createElement("td"),
            imgTd = document.createElement("td"),
            btnTd = document.createElement("td"),
            img = document.createElement("img");

        //define style
        imgTd.style.width = "200px";
        imgTd.style.maxWidth = "200px";
        nameTd.style.verticalAlign = "middle";
        nameTd.style.textAlign = "center";
        btnTd.style.verticalAlign = "middle";
        btnTd.style.textAlign = "center";

        //get image url from imageLink from database
        var imageURL;

        if (images[i].imageLink.includes("http")){
            imageURL = images[i].imageLink;
        }
        else {
            imageURL = backendServer + "images/" + images[i].imageLink;
        }

        img.style.width = "100%";
        img.classList.add("img-fluid");
        img.src = imageURL;

        //get image file from URL
        var filename = imageURL.split("/").pop();
        console.log("File name: " + filename);

        //Add image column
        imgTd.appendChild(img);
        tr.appendChild(imgTd);

        //Add name column
        nameTd.append(filename);
        tr.appendChild(nameTd);

        //Add action column
        btnTd.innerHTML = "<button class=\"btn btn-danger\" type=\"button\" onclick=" + "removeExistingImg(this," + images[i].id + ')' + ">\n" +
            "Delete" +
            "</button>";
        tr.appendChild(btnTd);

        //Add the whole row to table body
        tableBoby.appendChild(tr);
    }
}

//Turn delete button to undo button in editing and make changes to image lise
function removeExistingImg(button, imageId) {
    //Add image id to delete image list
    deletedImageList.push(imageId);

    //Change action button;
    $(button).removeClass("btn-danger").addClass("btn-success").html('Undo');
    $(button).removeAttr('onclick');
    $(button).attr('onClick', 'undoRemovingImage(this ,'+ imageId +');');
}

//Turn undo button to delete button in editing and make changes to image lise
function undoRemovingImage(button, imageId) {
    //Remove image id from delete image list
    for( var i = 0; i < deletedImageList.length; i++){
        if ( deletedImageList[i] === imageId) {
            deletedImageList.splice(i, 1);
        }
    }

    //Change action button;
    $(button).removeClass("btn-success").addClass("btn-danger").html('Delete');
    $(button).removeAttr('onclick');
    $(button).attr('onClick', 'removeExistingImg(this,'+ imageId +');');
}
//Go through selected file, show and add them to global imageArray
function traverseFiles(files, filesUpload, fileList, action) {
    if (typeof files !== "undefined") {
        for (var i = 0, l = files.length; i < l; i++) {

            if (action == "add"){
                uploadFile(files[i], filesUpload, fileList, "add");
                imageList.push(files[i]);
                imagePos++;
            }

            if (action == "edit"){
                uploadFile(files[i], filesUpload, fileList, "edit");
                addedImageList.push(files[i]);
                console.log("addedImageList.length:" + addedImageList.length);
                editImagePos++;
            }

        }
    }
    else {
        fileList.innerHTML = "No support for the File API in this web browser";
    }
}

function uploadFile(file, filesUpload, fileList, action) {
    var tr = document.createElement("tr"),
        nameTd = document.createElement("td"), sizeTd = document.createElement("td"),
        imgTd = document.createElement("td"), btnTd = document.createElement("td"),
        img = document.createElement("img"),
        actionButton = document.createElement("button"),
        reader;

    imgTd.style.width = "200px";
    imgTd.style.maxWidth = "200px";
    nameTd.style.verticalAlign = "middle";
    nameTd.style.textAlign = "center";
    sizeTd.style.verticalAlign = "middle";
    sizeTd.style.textAlign = "center";
    btnTd.style.verticalAlign = "middle";
    btnTd.style.textAlign = "center";
    img.style.width = "100%";
    img.classList.add("img-fluid")
    actionButton.classList.add("btn", "btn-danger");
    actionButton.type = "button";

    if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
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

    nameTd.innerHTML = file.name;

    if (action == "add"){
        // Present file info and append it to the list of files
        sizeTd.innerHTML = parseInt(file.size / 1024, 10) + " Kb";

        var pos = copyValue(imagePos);
        $(actionButton).click(function (){
            deleteImg(actionButton, pos, action);
        });
    }

    if (action == "edit"){
        var pos = copyValue(editImagePos);
        $(actionButton).click(function (){
            deleteImg(actionButton, pos, action);
        });

    }
    $(actionButton).html("Delete");
    btnTd.appendChild(actionButton);

    tr.appendChild(nameTd);
    if (action == "add"){
        tr.appendChild(sizeTd);
    }
    tr.appendChild(btnTd);

    fileList.appendChild(tr);

}

//Here because loop only show the last value
//Used to clone number without referencing
function copyValue(targetValue){
    return targetValue;
}

function deleteImg(btn, pos, action) {
    $(btn).closest('tr').remove();
    console.log("pos:" + pos);

    if (action == "add"){
        imageList.splice(pos, 1, null);
    }

    if (action == "edit") {
        addedImageList.splice(pos, 1, null);
    }

}

//Validate information after clicking submit
function validateCreate(){
    var result = true;
    var name = document.getElementById("txtName"),
        nameMessage = document.getElementById("messageName"),
        price = document.getElementById("txtPrice"),
        priceMessage = document.getElementById("messagePrice"),
        imageMessage = document.getElementById("messageImage");

    //Check name
    if (isEmptyOrSpaces($(name).val())){
        showMessage(nameMessage, "Name is required");
        result = false;
    }
    else {
        hideMessage(nameMessage);
    }

    //Check image
    if (listIsEmpty(imageList)){
        showMessage(imageMessage, "Image is required");
        result = false;
    }
    else {
        hideMessage(imageMessage);
    }

    //Check price
    if (isEmptyOrSpaces($(price).val()) && !isPositiveNumber(parseInt($(price).val()))){
        showMessage(priceMessage, "Price must be a positive number");
        result = false;
    }
    else {
        hideMessage(priceMessage);
    }

    return result;
}

function validateEdit() {
    var result = true;
    var name = document.getElementById("txtEditName"),
        nameMessage = document.getElementById("editMessageName"),
        price = document.getElementById("txtEditPrice"),
        priceMessage = document.getElementById("editMessagePrice");

    //Check name
    if (isEmptyOrSpaces($(name).val())){
        showMessage(nameMessage, "Name is required");
        result = false;
    }
    else {
        hideMessage(nameMessage);
    }
    //Check price
    if (isEmptyOrSpaces($(price).val()) || !isPositiveNumber(parseInt($(price).val()))){
        showMessage(priceMessage, "Price must be a positive number");
        result = false;
    }
    else {
        hideMessage(priceMessage);
    }

    return result;
}

function listIsEmpty(list) {
    var result = true;
    for (var i = 0; i < list.length; i++){
        if (list[i] !== null){
            result = false;
        }
    }
    return result;
}

function showMessage(messageElement, message) {
    if ($(messageElement).is(":hidden") ) {
        $(messageElement).show();
    }
    $(messageElement).text(message);
}

function hideMessage(messageElement) {
    if ($(messageElement).is(":visible") ) {
        $(messageElement).hide();
    }
}

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function isPositiveNumber(number){
    return number >= 0;
}

//Add crawl product submit function
$('#createForm').submit((function (e) {
    e.preventDefault();
    if (validateCreate()){
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
            url: backendServer + "api/crawl",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                alert('Success');
                //Close Modal
                $('#addCrawlProductModal').modal('toggle');
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

}));

//Edit crawl product submit function
$('#editForm').submit((function (e) {
    e.preventDefault();
    if (validateEdit()){
        var statusSelect = document.getElementById('editStatusId');
        var status = parseInt(statusSelect.options[statusSelect.selectedIndex].value);
        //get category select
        var categorySelect = document.getElementById('editCategoryId');
        //get category select value
        var category = parseInt(categorySelect.options[categorySelect.selectedIndex].value);
        //get brand select
        var brandSelect = document.getElementById('editBrandId');
        //get brand select value
        var brand = parseInt(brandSelect.options[brandSelect.selectedIndex].value);

        var objectData = {
            id : $("#editId").val(),
            name : document.getElementById('txtEditName').value,
            categoryId : category,
            branId : brand,
            price : parseFloat(document.getElementById('txtEditPrice').value),
            status : status,
            description : CKEDITOR.instances['txtEditDescription'].getData(),
            deleteImages : deletedImageList
        }
        var objectDataString = JSON.stringify(objectData);
        var formData = new FormData();
        formData.append('objectString', objectDataString);
        console.log("objectDataString: "+ objectDataString);
        for (var i = 0; i < addedImageList.length; i++) {
            if (addedImageList[i] !== null) {
                console.log(addedImageList[i]);
                formData.append('addedImages', addedImageList[i]);
            }
        }

        $.ajax({
            type: "PUT",
            url: backendServer + "api/crawl",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                alert('Success');
                //Close Modal
                $('#editCrawlProductModal').modal('toggle');
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
}));

//Load category for database to populate select list from adding and editing forms
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

//Load brand for database to populate select list from adding and editing forms
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

//Load status for database to populate select list from adding and editing forms
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