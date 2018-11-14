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
                        "                                        <div id=show-product-status-" + productList[i].id + ">" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                    <div class=\"card-footer white border-0\">\n" +
                        "                                        <button id=" + '"' + 'btnChangeStatus-' + productList[i].id + '"' + "class=\"btn btn-sm btn-dark float-right font-weight-bold\"\n alt=" + '"' + productList[i].statusId + '"' +
                        "                                           onclick=" + '"' +
                        'changeStatus(' + productList[i].id + "," + productList[i].quantity + ')' + '"' + ">Hide" +
                        "                                            </button>\n" +
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
                    if (productList[i].statusId == 3) {
                        $("#btnChangeStatus-" + productList[i].id).text("Show");
                        $("#btnChangeStatus-" + productList[i].id).attr("class", "btn btn-sm btn-primary float-right font-weight-bold");
                    }
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

                    showStatus(productList[i], $("#show-product-status-" + productList[i].id));

                }


                productListPagination(productListTotalPage, productListPage);

            }

        }, error: function (e) {
            alert(e);
        }
    })
};

function showStatus(stat, location) {
    var statusId = stat.statusId;
    var status = stat.status;


    switch (statusId) {
        case 1:
            location.addClass("badge badge-success");
            break;
        case 2:
            location.addClass("badge badge-warning");
            break;
        case 3:
            location.addClass("badge badge-info");
            break;
        case 4:
            location.class = "badge badge-light";
            break;
    }

    location.append(status);
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

function changeStatus(id, quantity) {
    $.ajax({
        url: backendServer + "/api/product/changeStatus?productId=" + id,
        dataType: 'json',
        type: 'PUT',
        success: function (res) {
            alert(res.message);

            var statusId = $("#btnChangeStatus-" + id).attr("alt");

            if (statusId == 1 || statusId == 2) {
                $("#btnChangeStatus-" + id).text("Show");
                $("#btnChangeStatus-" + id).attr("class", "btn btn-sm btn-primary float-right font-weight-bold");
                $("#show-product-status-" + id).attr("class", "badge badge-info");
                $("#show-product-status-" + id).text("HIDDEN");
                $("#btnChangeStatus-" + id).attr("alt", "3");
            } else {
                $("#btnChangeStatus-" + id).text("Hide");
                $("#btnChangeStatus-" + id).attr("class", "btn btn-sm btn-dark float-right font-weight-bold");
                if (quantity > 0) {
                    $("#show-product-status-" + id).attr("class", "badge badge-success");
                    $("#show-product-status-" + id).text("AVAILABLE");
                    $("#btnChangeStatus-" + id).attr("alt", "1");
                } else {
                    $("#show-product-status-" + id).attr("class", "badge badge-warning");
                    $("#show-product-status-" + id).text("SOLD OUT");
                    $("#btnChangeStatus-" + id).attr("alt", "2");
                }

            }
        }, error: function (res) {
            alert(res.message);
        }
    });
}