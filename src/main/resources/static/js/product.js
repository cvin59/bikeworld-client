const backendServer = 'http://localhost:8080';

$(function () {
    CKEDITOR.replace('inputProductDescription');
    CKEDITOR.replace('editProductDescription');
});

$("a.btnCreate").click(function () {
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

$("#imgUploader").change(function (e) {
    var imageLoader = $("#imgUploader");
    var canvas = $("#myCanvas");
    var ctx = canvas[0].getContext('2d');


    // load image
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
                0, 0, canvas[0].width, canvas[0].height);

        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);

    // load name
    $("#imgName").append(e.target.files[0].name);

    // load size
    var size=e.target.files[0].size /1024;
    $("#imgSize").append( size+ " Kb");
});

$("#btnDelete").click(function () {
    $("#ing1").remove();
})


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
$('#btnCreate').click(function () {
    var cate = document.getElementById("inputProductCategory");
    var brand = document.getElementById("inputProductBrand");

    var objectData =
        {
            name: document.getElementById('inputProductName').value,
            description: CKEDITOR.instances['inputProductDescription'].getData(),
            price: document.getElementById('inputProductPrice').value,
            //quantity: document.getElementById('inputProductQuantity').value,
            seller: "user",
            category: cate.options[cate.selectedIndex].value,
            brand: brand.options[brand.selectedIndex].value,
        };
    var objectDataString = JSON.stringify(objectData);
    var e = document.getElementById("inputProductBrand");
    var strUser = e.options[e.selectedIndex].value;
    alert(strUser);
    $.ajax({
        type: "POST",
        url: backendServer + "/api/product",
        dataType: "json",
        data: {
            productModelString: objectDataString
        },
        success: function (data) {
            alert('Success');
        },
        error: function () {
            alert(objectDataString);
        }
    });
});


$('#product-list-link').click(function () {
    $.ajax({
        url: backendServer + "/api/product/seller/user",
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            var productList = res.data;

            if (productList != null) {
                for (i = 0; i < productList.length; i++) {
                    localStorage.setItem('sellProduct-' + productList[i].id, JSON.stringify(productList[i]));

                    $("#show-product-list").append(
                        "<div class=\"row wow bounceInUp animated fast\">\n" +
                        "                                <div class=\"col-4 pt-3 view zoom\">\n" +
                        "                                    <a href=\"\"><img class=\"img-fluid\"\n" +
                        "                                                    src=\"https://mcn-images.bauersecure.com/pagefiles/597618/1-scrambler.jpg\"></a>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-8 card shadow-none\">\n" +
                        "                                    <div class=\"card-body\">\n" +
                        "                                        <a>\n" +
                        "                                            <h4 class=\"font-weight-bold\">" +
                        productList[i].name +
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
                        productList[i].price + " Dollar" +
                        "</h5>\n" +
                        "                                        <dl class=\"row\">\n" +
                        "                                            <dt class=\"col-sm-3\">Quantity</dt>\n" +
                        "                                            <dd class=\"col-sm-9\">" +
                        productList[i].quantity +
                        "</dd>\n" +
                        "\n" +
                        "                                            <dt class=\"col-sm-3\">Added Date</dt>\n" +
                        "                                            <dd class=\"col-sm-9\">" +
                        productList[i].postDate +
                        "\n" +
                        "                                            </dd>\n" +
                        "                                        </dl>\n" +
                        "                                        <div>\n" +
                        "                                            <span class=\"badge badge-danger\">Status</span>\n" +
                        "                                            <span class=\"badge badge-light\">Status</span>\n" +
                        "                                            <span class=\"badge badge-primary\">Status</span>\n" +
                        "                                            <span class=\"badge badge-success\">Status</span>\n" +
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
                        "                                           onclick='showEditPage(" + productList[i].id + ")'\n" +
                        "                                           data-target=\"#editProductModal\"><i\n" +
                        "                                                class=\"fa fa-edit mr-1\"></i>Edit</a>\n" +
                        "                                        <a class=\"btn btn-sm btn-danger float-right font-weight-bold\"\n" +
                        "                                           data-toggle=\"modal\"\n" +
                        "                                           onclick='showDetailPage(" + productList[i].id + ")'\n" +
                        "                                           data-target=\"#productDetailModal\"><i\n" +
                        "                                                class=\"fa fa-edit mr-1\"></i>Detail</a>\n" +
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"pl-0 pr-0 mb-3 pt-3 pb-3 border-top\">"
                    );

                    var rating = "#show-product-stars-" + i;
                    var rate = productList[i].totalRates;
                    var star = productList[i].totalRatePoint / rate;
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

                    $(rating).html(stars);
                }

            }

        }, error: function (e) {
            alert(e);
        }
    })
});


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
    $("#editProductDescription").val(product.description);

}

function showDetailPage(seq) {
    var product = JSON.parse(localStorage.getItem('sellProduct-' + seq));
    $("#detailProductName").html(product.name);

    var rate = product.totalRatePoint;
    var rater = product.totalRates;

    if (rater > 1) {
        $("#detailProductRater").html(rater + " Reviews");
    } else {
        $("#detailProductRater").html(rater + " Review");
    }
    $("#detailProductPrice").html(product.price);
    $("#detailProductQuantity").html(product.quantity);
    $("#detailProductPostDate").html(product.postDate);

    showStars(rate, rater, $("#detailProductRate"));

}
