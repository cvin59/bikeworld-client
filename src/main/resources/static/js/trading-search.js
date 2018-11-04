var backendServer = 'http://localhost:8080';
var productListSize = 12;
var productListPage = 1;
var productListTotalPage = "";

var searchValue;

$(function () {

    var selectSortBy = $("#selectSortBy");
    var selectDirection = $("#selectDirection");

    const getUrlParameter = (sParam) => {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    $("#selectSearchType").val('2').change();

    searchValue = getUrlParameter('searchValue');
    var sort;
    showProductList();

});

function showProductList() {
    $.ajax({
        url: backendServer + "/api/product/search?searchValue=" + searchValue +
            "&page=" + productListPage +
            "&size=" + productListSize +
            "&sort=" + $("#selectDirection").val() +
            "&sortBy=" + $("#selectSortBy").val(),

        //  url: "http://localhost:8080/api/product/search?searchValue=a",
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            var productList = res.data.viewModels;
            productListPage = res.data.currentPage;
            productListTotalPage = res.data.totalPage;

            if (productList != null) {
                for (i = 0; i < productList.length; i++) {
                    localStorage.setItem('sellProduct-' + productList[i].productInfo.id, JSON.stringify(productList[i]));
                    var avatar = "";
                    if (productList[i].ProductImg != null) {
                        avatar = backendServer + productList[i].ProductImg[0];
                    }

                    $("#show-product-list").append(" <div class=\"col-md-4 clearfix d-none d-md-block\">\n" +
                        "                                <!-- Card -->\n" +
                        "                                <div class=\"card card-cascade wider card-ecommerce\">\n" +
                        "                                    <!-- Card image -->\n" +
                        "                                    <div class=\"view view-cascade overlay\">\n" +
                        "                                        <img src=" + '"' + avatar + '"' + "\n" +
                        "                                            class=\"card-img-top\" alt=\"sample photo\">\n" +
                        "                                        <a" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].productInfo.id + '"' +
                        ">\n" +
                        "                                            <div class=\"mask rgba-white-slight\"></div>\n" +
                        "                                        </a>\n" +
                        "                                    </div>\n" +
                        "                                    <!-- Card image -->\n" +
                        "                                    <!-- Card content -->\n" +
                        "                                    <div class=\"card-body card-body-cascade text-center\">\n" +
                        "                                        <!-- Category & Title -->\n" +
                        "                                        <a" +
                        " href=" + '"' + frontendServer + "/product/category/" + productList[i].productInfo.categoryId.id + '"' +
                        "" +
                        "class=\"text-muted\">\n" +
                        "                                            <h5>" +
                        productList[i].productInfo.categoryId.name +
                        "</h5>\n" +
                        "                                        </a>\n" +
                        "                                        <h4 class=\"card-title\">\n" +
                        "                                            <strong>\n" +
                        "                                                <a" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].productInfo.id + '"' +
                        ">" +
                        productList[i].productInfo.name +
                        "</a>\n" +
                        "                                            </strong>\n" +
                        "                                        </h4>\n" +
                        "                                        <!-- Star -->\n" +
                        "                                        <p class=\"card-text\" id=show-product-stars-" + i + "></p>\n" +
                        "                                        <!-- Card footer -->\n" +
                        "                                        <div class=\"card-footer px-1\">\n" +
                        "                                            <span class=\"float-left font-weight-bold\">\n" +
                        "                                                <strong>" +
                        productList[i].productInfo.price +
                        "</strong>\n" +
                        "                                            </span>\n" +
                        "                                            <span class=\"float-right\">\n" +
                        "                                                <a class=\"\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Quick Look\"" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].productInfo.id + '"' +
                        ">\n" +
                        "                                                    Details >>\n" +
                        "                                                </a>\n" +
                        "                                            </span>\n" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                    <!-- Card content -->\n" +
                        "                                </div>\n" +
                        "                                <!-- Card -->\n" +
                        "                            </div>");

                    var rate = productList[i].productInfo.totalRates;
                    var star = productList[i].productInfo.totalRatePoint/rate ;
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
                    $("#show-product-stars-" + i).html(stars);
                    //
                    // showStatus(productList[i].productInfo.statusId, i, $("#show-product-status-" + i));
                }
                productListPagination(productListTotalPage, productListPage);

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

$("#selectDirection").on("change", function () {
    $("#show-product-list").html("");
    showProductList();
})

$("#selectSortBy").on("change", function () {
    $("#show-product-list").html("");
    showProductList();
})

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