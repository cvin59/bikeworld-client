
var productListPage = 1;
var productListTotalPage;
var productListSize = 5;
var productListDirection = "";

// Show Product List
$('#product-list-link').one("click", showProductList());

function showProductList() {
    var seller = localStorage.getItem("username");

    var url = backendServer + "/api/product/seller/" + seller
        + "?page=" + productListPage
        + "&size=" + productListSize
        + "&sort=" + productListDirection;

    var searchValue = $("#search-field").val();
    productListDirection = $("#selectionDirection").val();
    if (searchValue != null) {
        url = backendServer + "/api/product/" + seller + "/search?searchValue=" + searchValue
            + "&page=" + productListPage
            + "&size=" + productListSize
            + "&sort=" + productListDirection;
    }

    $.ajax({
        url: url,
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            var productList = res.data.productInfo;
            productListPage = res.data.currentPage;
            productListTotalPage = res.data.totalPage;

            if (productList != null) {
                for (i = 0; i < productList.length; i++) {
                    localStorage.setItem('sellProduct-' + productList[i].id, JSON.stringify(productList[i]));
                    var avatar = "";
                    if (productList[i].images != null) {
                        avatar = backendServer + productList[i].images[0];
                    } else {
                        avatar = backendServer + "/images/img404.jpg";
                    }

                    $("#show-product-list").append(
                        "<div class=\"row\">\n" +
                        "                                <div class=\"col-4 pt-3 view zoom\">\n" +
                        "                                    <a href=\"\"><img class=\"img-fluid\"\n" +
                        "                                                    src=" + '"' + avatar + '"' + "></a>\n" +
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
                        '                                           href="/user/product/edit/' + productList[i].id + '"\n' +
                        "                                                class=\"fa fa-edit mr-1\"></i>Edit</a>\n" +
                        "                                        <a class=\"btn btn-sm btn-danger float-right font-weight-bold\"\n" +
                        '                                           href="/user/product/detail/' + productList[i].id + '"\n' +
                        "                                                class=\"fa fa-edit mr-1\"></i>Detail</a>\n" +
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"pl-0 pr-0 mb-3 pt-3 pb-3 border-top\">"
                    );

                    var rate = productList[i].totalRater;
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

                    $("#show-product-stars-" + i).html(stars);

                    showStatus(productList[i], i, $("#show-product-status-" + i));

                }
                productListPagination(productListTotalPage, productListPage);

            }

        }, error: function (e) {
            alert(e);
        }
    })
};

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

function showDetailPage(seq) {
    var product = JSON.parse(localStorage.getItem('sellProduct-' + seq));
    $("#detailProductName").html(product.name);

    $("#detailProductAvatar").attr("src", backendServer + product.images[0]);

    var rate = product.totalRatePoint;
    var rater = product.totalRater;

    if (rater > 1) {
        $("#detailProductRater").html(rater + " Reviews");
    } else {
        $("#detailProductRater").html(rater + " Review");
    }
    $("#detailProductPrice").html(product.price + " Dollar");
    $("#detailProductQuantity").html(product.quantity);
    $("#detailProductPostDate").html(product.postDate);

    showStars(rate, rater, $("#detailProductRate"));
    showStatus(product.statusId, seq, $("#detailProductStatus"));
    loadOrderData(product.id);
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

    switch (totalPage) {
        case 1:
            $("#productList-back2").css("display", "none");
            $("#productList-back").css("display", "none");
            $("#productList-next").css("display", "none");
            $("#productList-next2").css("display", "none");
            break;
        case 2:
            if (currentPage == 1) {
                $("#productList-back2").css("display", "none");
                $("#productList-back").css("display", "none");
                $("#productList-next").css("display", "block");
                $("#productList-next2").css("display", "none");
            } else if (currentPage == 2) {
                $("#productList-back2").css("display", "none");
                $("#productList-back").css("display", "block");
                $("#productList-next").css("display", "none");
                $("#productList-next2").css("display", "none");
            }
            break;
        default:
            switch (currentPage) {
                case 1:
                    $("#productList-back2").css("display", "none");
                    $("#productList-back").css("display", "none");
                    $("#productList-next").css("display", "block");
                    $("#productList-next2").css("display", "block");
                    break;
                case 2:
                    $("#productList-back2").css("display", "none");
                    $("#productList-back").css("display", "block");
                    $("#productList-next").css("display", "block");
                    $("#productList-next2").css("display", "block");
                    break;
                default:
                    if (totalPage - currentPage == 0) {
                        $("#productList-back2").css("display", "block");
                        $("#productList-back").css("display", "block");
                        $("#productList-next").css("display", "none");
                        $("#productList-next2").css("display", "none");
                    } else if (totalPage - currentPage == 1) {
                        $("#productList-back2").css("display", "block");
                        $("#productList-back").css("display", "block");
                        $("#productList-next").css("display", "block");
                        $("#productList-next2").css("display", "none");
                    } else {
                        $("#productList-next").css("display", "block");
                        $("#productList-next2").css("display", "blcck");
                        $("#productList-back2").css("display", "block");
                        $("#productList-back").css("display", "block");
                    }
                    break;
            }
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
    if (productListPage - 5 < 2) {
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
        productListPage += 5;
    }
    $("#show-product-list").html("");
    showProductList();
});

$("#selectionDirection").change(function () {
    productListDirection = $("#selectionDirection").val();
    productListPage = 1;
    $("#show-product-list").html("");
    showProductList();
});

$("#search-field").keypress(function (e) {
    if (e.which == '13') {
        $("#show-product-list").html("");
        showProductList();
    }
});