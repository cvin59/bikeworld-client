const backendServer = 'http://localhost:8080';

var imgSeq = 0;
var uploadImgList = [];
var deleteImgList = [4, 5, 6];

var productListPage = 1;
var productListTotalPage;
var productListSize = 5;


$(function () {
    CKEDITOR.replace('inputProductDescription');
    CKEDITOR.replace('editProductDescription');

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


});

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
$('#editProductPrice').on("change", function () {
    var val = Math.abs(parseInt(this.value, 10) || 1);
    this.value = val < 1 ? 1 : val;
});
$('#inputProductQuantity').on("change", function () {
    var val = Math.abs(parseInt(this.value, 10) || 1);
    this.value = val > 100 ? 99 : val;
});
$('#editProductQuantity').on("change", function () {
    var val = Math.abs(parseInt(this.value, 10) || 1);
    this.value = val > 100 ? 99 : val;
});


//Create Product
$('#create-product-form').submit(function () {
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
            category: cate.options[cate.selectedIndex].value,
            brand: brand.options[brand.selectedIndex].value,
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
            alert("error:" + e)
        }
    });
});

$('#edit-product-form').submit(function () {

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

    formData.append("deleteImgList", deleteImgJson);

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
        success: function () {
            alert("Success");
        }, error: function (e) {
            alert("Error: " + e);
        }
    });
});


// Show Product List
$('#product-list-link').one("click", showProductList());

function showProductList() {
    var seller = localStorage.getItem("username");

    var sort;

    $.ajax({
        url: backendServer + "/api/product/seller/" + seller + "?page=" + productListPage + "&size=" + productListSize,
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            var productList = res.data.viewModels;
            productListPage = res.data.currentPage;
            productListTotalPage = res.data.totalPage;

            if (productList != null) {
                for (i = 0; i < productList.length; i++) {
                    localStorage.setItem('sellProduct-' + productList[i].productInfo.id, JSON.stringify(productList[i]));
                    $("#show-product-list").append(
                        "<div class=\"row wow bounceInUp animated fast\">\n" +
                        "                                <div class=\"col-4 pt-3 view zoom\">\n" +
                        "                                    <a href=\"\"><img class=\"img-fluid\"\n" +
                        "                                                    src=" + '"' + backendServer + productList[i].ProductImg[0] + '"' + "></a>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-8 card shadow-none\">\n" +
                        "                                    <div class=\"card-body\">\n" +
                        "                                        <a>\n" +
                        "                                            <h4 class=\"font-weight-bold\">" +
                        productList[i].productInfo.name +
                        "</h4>\n" +
                        "                                        </a>\n" +
                        "                                        <!--Rating-->\n" +
                        "                                        <div class=\"d-flex justify-content-start\" id=show-product-stars-" + i + ">" +
                        // "                                            <i class=\"fa fa-star orange-text\"> </i>\n" +
                        // "                                            <i class=\"fa fa-star orange-text\"> </i>\n" +
                        // "                                            <i class=\"fa fa-star orange-text\"> </i>\n" +
                        // "                                            <i class=\"fa fa-star orange-text\"> </i>\n" +
                        // "                                            <i class=\"fa fa-star-o orange-text\"> </i>\n" +
                        "                                        </div>\n" +
                        "\n" +
                        "                                        <h5 class=\"text-danger\">" +
                        productList[i].productInfo.price + " Dollar" +
                        "</h5>\n" +
                        "                                        <dl class=\"row\">\n" +
                        "                                            <dt class=\"col-sm-3\">Quantity</dt>\n" +
                        "                                            <dd class=\"col-sm-9\">" +
                        productList[i].productInfo.quantity +
                        "</dd>\n" +
                        "\n" +
                        "                                            <dt class=\"col-sm-3\">Added Date</dt>\n" +
                        "                                            <dd class=\"col-sm-9\">" +
                        productList[i].productInfo.postDate +
                        "\n" +
                        "                                            </dd>\n" +
                        "                                        </dl>\n" +
                        "                                        <div id=show-product-status-" + i + ">" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                    <div class=\"card-footer white border-0\">\n" +
                        "                                        <a class=\"btn btn-sm btn-primary float-right font-weight-bold\"\n" +
                        "                                           data-toggle=\"modal\"\n" +
                        "                                           data-target=\"#editQuantityModal\"><i\n" +
                        "                                                class=\"fa fa-plus mr-1\"></i>Add\n" +
                        "                                            Quantity</a>\n" +
                        "                                        <a class=\"btn btn-sm btn-success float-right font-weight-bold \"\n" +
                        "                                           data-toggle=\"modal\"\n" +
                        "                                           onclick='showEditPage(" + productList[i].productInfo.id + ")'\n" +
                        "                                           data-target=\"#editProductModal\"><i\n" +
                        "                                                class=\"fa fa-edit mr-1\"></i>Edit</a>\n" +
                        "                                        <a class=\"btn btn-sm btn-danger float-right font-weight-bold\"\n" +
                        "                                           data-toggle=\"modal\"\n" +
                        "                                           onclick='showDetailPage(" + productList[i].productInfo.id + ")'\n" +
                        "                                           data-target=\"#productDetailModal\"><i\n" +
                        "                                                class=\"fa fa-edit mr-1\"></i>Detail</a>\n" +
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"pl-0 pr-0 mb-3 pt-3 pb-3 border-top\">"
                    );

                    var rate = productList[i].productInfo.totalRates;
                    var star = productList[i].productInfo.totalRatePoint / rate;
                    var stars = "";

                    for (j = 0; j <= 4; j++) {
                        if (star <= j) {
                            stars = stars + "<i class=\"fa fa-star-o orange-text\"> </i>";
                        }

                        if (star > j && star < j + 1) {
                            stars = stars + "<i class=\"fa fa-star-half-o orange-text\"></i>";
                        }

                        if (star >= j + 1) {
                            stars = stars + ("<i class=\"fa fa-star orange-text\"></i>");
                        }
                    }

                    if (rate > 1) {
                        stars = stars + "<h6 class=\"ml-2\">" + rate + " Reviews</h6>";
                    } else {
                        stars = stars + "<h6 class=\"ml-2\">" + rate + " Review</h6>";
                    }

                    $("#show-product-stars-" + i).html(stars);

                    showStatus(productList[i].productInfo.statusId, i, $("#show-product-status-" + i));
                    productListPagination(productListTotalPage, productListPage);
                }


            }

        }, error: function (e) {
            alert(e);
        }
    })
};

function showStatus(stat, i, location) {
    var statusId = stat.id;
    var status = stat.name;


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
    $("#editProductName").val(product.productInfo.name);
    $("#editProductAddress").val(product.productInfo.address);
    $("#editProductPrice").val(product.productInfo.price);
    $("#editProductQuantity").val(product.productInfo.quantity);
    CKEDITOR.instances.editProductDescription.setData(product.productInfo.description);

    var images = product.ProductImg;
    var imageId = product.ProductImgId;
    var fileList = document.getElementById("edit-file-list");
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

function showDetailPage(seq) {
    var product = JSON.parse(localStorage.getItem('sellProduct-' + seq));
    $("#detailProductName").html(product.productInfo.name);

    $("#detailProductAvatar").attr("src", backendServer + product.ProductImg[0]);

    var rate = product.productInfo.totalRatePoint;
    var rater = product.productInfo.totalRates;

    if (rater > 1) {
        $("#detailProductRater").html(rater + " Reviews");
    } else {
        $("#detailProductRater").html(rater + " Review");
    }
    $("#detailProductPrice").html(product.productInfo.price + " Dollar");
    $("#detailProductQuantity").html(product.productInfo.quantity);
    $("#detailProductPostDate").html(product.productInfo.postDate);

    showStars(rate, rater, $("#detailProductRate"));
    showStatus(product.productInfo.statusId, seq, $("#detailProductStatus"));
}


function productListPagination(totalPage, currentPage) {

    if (currentPage < 2) {
        document.getElementById("productList-first-page").className = "page-item disabled";
        document.getElementById("productList-previous-page").className = "page-item disabled";
    } else {
        document.getElementById("productList-first-page").className = "page-item";
        document.getElementById("productList-previous-page").className = "page-item";
    }

    if (currentPage == totalPage) {
        document.getElementById("productList-last-page").className = "page-item disabled";
        document.getElementById("productList-next-page").className = "page-item disabled";
    } else {
        document.getElementById("productList-last-page").className = "page-item";
        document.getElementById("productList-next-page").className = "page-item";
    }

    switch (currentPage) {
        case 1:
            $("#productList-back2").css("display", "none");
            $("#productList-back").css("display", "none");
            break;
        case 2:
            $("#productList-back2").css("display", "none");
            $("#productList-back").css("display", "block");
            break;

        case totalPage:
            $("#productList-next").css("display", "none");
            $("#productList-next2").css("display", "none");
            break;
        case totalPage - 1:
            $("#productList-next").css("display", "none");
            $("#productList-next2").css("display", "block");
            break;
        default:
            $("#productList-back2").css("display", "block");
            $("#productList-back").css("display", "block");
            $("#productList-next2").css("display", "block");
            $("#productList-next").css("display", "block");
            break;
    }
    var back2 = currentPage - 2;
    $("#productList-back2").html("  <a class=\"page-link\">" + back2 + "</a>");

    var back = currentPage - 1;
    $("#productList-back").html("  <a class=\"page-link\">" + back + "</a>");

    $("#productList-current-page").html("  <a class=\"page-link\">" + currentPage + "</a>");

    var next = currentPage + 1;
    $("#productList-next").html("  <a class=\"page-link\">" + next + "</a>");

    var next2 = currentPage + 2;
    $("#productList-next2").html("  <a class=\"page-link\">" + next2 + "</a>");
}


$("#productList-next").click(function () {
    productListPage += 1;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-next2").click(function () {
    productListPage += 2;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-back").click(function () {
    productListPage -= 1;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-back2").click(function () {
    productListPage -= 2;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-first-page").click(function () {
    productListPage = 1;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-last-page").click(function () {
    productListPage = productListTotalPage;
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-previous-page").click(function () {
    if (productListPage - productListTotalPage < 5) {
        productListPage = 1;
    } else {
        productListPage -= 5;
    }
    $("#show-product-list").html("");
    showProductList();
});

$("#productList-next-page").click(function () {
    if (productListTotalPage - productListPage < 5) {
        productListPage = productListTotalPage;
    } else {
        productListPage -= 5;
    }
    $("#show-product-list").html("");
    showProductList();
});