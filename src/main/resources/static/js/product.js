const backendServer = 'http://localhost:8080';

var imgSeq = 0;
var uploadImgList = [];

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


    var filesUpload = document.getElementById("files-upload"),
        fileList = document.getElementById("file-list");


    function uploadFile(file) {
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

    function traverseFiles(files) {
        if (typeof files !== "undefined") {
            for (var i = 0, l = files.length; i < l; i++) {
                uploadFile(files[i]);
                uploadImgList.push(files[i]);
                imgSeq++;
            }
        }
        else {
            fileList.innerHTML = "No support for the File API in this web browser";
        }
    }

    filesUpload.addEventListener("change", function () {
        traverseFiles(this.files);
    }, false);


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
        success: function (data) {
            alert('Success');
        },
        error: function (e) {
            console.log(e);
            alert("error")
        }
    });
});


$('#product-list-link').one('click', function () {
    var seller = localStorage.getItem("username");
    $.ajax({
        url: backendServer + "/api/product/seller/" + seller,
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            var productList = res.data;

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
                }


            }

        }, error: function (e) {
            alert(e);
        }
    })
});

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
    $("#editProductDescription").val(product.productInfo.description);
    CKEDITOR.instances.editor1.setData(t);
}

function showDetailPage(seq) {
    var product = JSON.parse(localStorage.getItem('sellProduct-' + seq));
    $("#detailProductName").html(product.productInfo.name);

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
