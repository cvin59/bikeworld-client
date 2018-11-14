var backendServer = 'http://localhost:8080';
var productListSize = 12;
var productListPage = 1;
var productListTotalPage = "";
var categories = [];
var brands = [];
var searchValue;

$(function () {

    $.ajax({
        url: backendServer + "/api/common/loadBrand",
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var array = response.data;
            if (array != '') {
                for (i = 0; i < array.length; i++) {
                    $("#productBrand").append("<div class=\"custom-control custom-checkbox\">\n" +
                        "  <input type=\"checkbox\" class=\"custom-control-input\" id=\"" + "cbxBrand-" + array[i].id + "\" >\n" +
                        "  <label class=\"custom-control-label\" for=\"" + "cbxBrand-" + array[i].id + "\">" +
                        array[i].name +
                        "</label>\n" +
                        "</div>");
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
                    for (i = 0; i < array.length; i++) {
                        $("#productCategory").append("<div class=\"custom-control custom-checkbox\">\n" +
                            "  <input type=\"checkbox\" class=\"custom-control-input\" id=\"" + "cbxCategory-" + array[i].id + "\">\n" +
                            "  <label class=\"custom-control-label\" for=\"" + "cbxCategory-" + array[i].id + "\">" +
                            array[i].name +
                            "</label>\n" +
                            "</div>");
                    }
                }
            },
            error: function (e) {
                alert("ERROR load: ", e);
            }
        })
    )

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
            +"&categories" + categories +
            +"&brand=" + brands +
            "&page=" + productListPage +
            "&size=" + productListSize +
            "&sort=" + $("#selectDirection").val() +
            "&sortBy=" + $("#selectSortBy").val(),

        //  url: "http://localhost:8080/api/product/search?searchValue=a",
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

                    $("#show-product-list").append(" <div class=\"col-md-3 clearfix d-none d-md-block mb-3\">\n" +
                        "                                <!-- Card -->\n" +
                        "                                <div class=\"card card-cascade wider card-ecommerce\">\n" +
                        "                                    <!-- Card image -->\n" +
                        "                                    <div class=\"view view-cascade overlay\">\n" +
                        "                                        <img src=" + '"' + avatar + '"' + "\n" +
                        "                                            class=\"card-img-top\" alt=\"sample photo\">\n" +
                        "                                        <a" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].id + '"' +
                        ">\n" +
                        "                                            <div class=\"mask rgba-white-slight\"></div>\n" +
                        "                                        </a>\n" +
                        "                                    </div>\n" +
                        "                                    <!-- Card image -->\n" +
                        "                                    <!-- Card content -->\n" +
                        "                                    <div class=\"card-body card-body-cascade text-center\">\n" +
                        "                                        <!-- Category & Title -->\n" +
                        "                                        <a" +
                        " href=" + '"' + frontendServer + "/product/category/" + productList[i].categoryId + '"' +
                        "" +
                        "class=\"text-muted\">\n" +
                        "                                            <h5>" +
                        productList[i].category +
                        "</h5>\n" +
                        "                                        </a>\n" +
                        "                                        <h4 class=\"card-title\">\n" +
                        "                                            <strong>\n" +
                        "                                                <a" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].id + '"' +
                        ">" +
                        formatName(productList[i].name) +
                        "</a>\n" +
                        "                                            </strong>\n" +
                        "                                        </h4>\n" +
                        "                                        <!-- Star -->\n" +
                        "                                        <p class=\"card-text\" id=show-product-stars-" + i + "></p>\n" +
                        "                                        <!-- Card footer -->\n" +
                        "                                        <div class=\"card-footer px-1\">\n" +
                        "                                            <span class=\"float-left font-weight-bold\">\n" +
                        "                                                <strong>" +
                        productList[i].price +
                        "</strong>\n" +
                        "                                            </span>\n" +
                        "                                            <span class=\"float-right\">\n" +
                        "                                                <a class=\"\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Quick Look\"" +
                        " href=" + '"' + frontendServer + "/product/detail/" + productList[i].id + '"' +
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

                    var rate = productList[i].totalRater;
                    var star = productList[i].totalRatePoint / rate;
                    var stars = "";
                    if (rate != 0) {
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
                    } else {
                        $("#show-product-stars-" + i).html("0 Review");
                    }
                    //
                    // showStatus(productList[i].statusId, i, $("#show-product-status-" + i));
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

const formatName = (name) => {
    if (name.length >= 15) {
        return name.substring(0, 15) + "...";
    }
    return name;
}