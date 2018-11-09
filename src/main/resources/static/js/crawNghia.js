
let backendServer = "http://localhost:8080";

function runCrawl() {
    let site = $("#cbbSite").val().toLowerCase();
    $.ajax({
        type: 'POST',
        url: backendServer + 'api/crawl/run/' + site,
        data: {get_param: 'value'},
        dataType: 'json',
        success: function (data) {


            console.log(data);
            // $.each(data, function(index, element) {
            //     $('body').append($('<div>', {
            //         text: element.name
            //     }));
            // });
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function stopCrawl() {
    let site = $("#cbbSite").val().toLowerCase();
    $.ajax({
        type: 'POST',
        url: backendServer + 'api/crawl/stop/' + site,
        data: {get_param: 'value'},
        dataType: 'json',
        success: function (data) {

            alert("!");
            console.log(data);
            // $.each(data, function(index, element) {
            //     $('body').append($('<div>', {
            //         text: element.name
            //     }));
            // });
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function viewCrawl(site) {
    $.ajax({
        type: 'GET',
        url: backendServer + 'api/crawl/view/' + site,
        data: {get_param: 'value'},
        dataType: 'json',
        success: function (data) {

            alert("!");
            console.log(data);
            // $.each(data, function(index, element) {
            //     $('body').append($('<div>', {
            //         text: element.name
            //     }));
            // });
        },
        error: function (data) {
            console.log(data);
        }
    });
}

let productList = [];
let totalPage;
let totalItem;
let currentPage = 0;
let pageSize = 20;

function getPageCount() {
    $.ajax({
        type: 'GET',
        url: backendServer + 'api/crawl/countpending/',
        data: {get_param: 'value'},
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            totalItem = data;
            // console.log(totalItem);
            totalPage = totalItem / 20 + ((totalItem % 20) & 1);
            prepareProductList();
            productListPagination(totalPage, 1);
            loadAndShow(1);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function prepareProductList() {
    let demoPaging = $("#demoPagin");
    demoPaging.empty();
    productList = [];
    productList.push(3);
    for (let i = 1; i <= totalPage; i++) {
        productList.push(3);
        demoPaging.append('<li><a onclick="loadAndShow(' + i + ')">' + i + '</a></li>');
    }
}

// function addRow(rowData, pos) {
//     let tableBody = $("#crawlTableBody");
// }

function loadDataOnly(pageNum) {
    // for (let i = 0; i < productList.length; i++) {
    //     if (productList[i].num === page) {
    //         return;
    //     }
    // }
    if (1 > pageNum || pageNum > totalPage) {
        return;
    }
    if (productList[pageNum] != 3) {
        return;
    }
    $.ajax({
        type: 'GET',
        url: backendServer + 'api/crawl/pending/' + pageNum,
        data: {get_param: 'value'},
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            productList[pageNum] = data.data;
        },
        error: function (data) {
            console.log(data);
        }
    });
}


function loadAndShow(pageNum) {
    // console.log("1");
    // for (let i = 0; i < productList.length; i++) {
    //     if (productList[i].num === page) {
    //         return;
    //     }
    // }
    if (1 > pageNum || pageNum > totalPage) {
        return;
    }
    if (productList[pageNum] != 3) {
        showPage(pageNum);
        return;
    }
    $.ajax({
        type: 'GET',
        url: backendServer + 'api/crawl/pending/' + pageNum,
        data: {get_param: 'value'},
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            productList[pageNum] = data.data;
            showPage(pageNum);
            if (1 < pageNum) {
                loadDataOnly(pageNum - 1);
            }
            if (pageNum < totalPage) {
                loadDataOnly(pageNum + 1);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function showPage(pageNum) {
    // alert(pageNum);
    let tableBody = $("#crawlTableBody");
    tableBody.empty();
    let page = productList[pageNum];
    // console.log(page);
    for (let i = 0; i <= page.length; i++) {
        let rowData = page[i];
        if (typeof rowData != 'undefined') {
            let pos = (pageNum - 1) * pageSize + i + 1;
            tableBody.append("                                <tr>\n" +
                "                                    <td style=\"width: 5%\">" + pos + "</td>\n" +
                "                                    <td>" + rowData.name + "</td>\n" +
                "                                    <td>" + rowData.price + "</td>\n" +
                "                                    <td></td>\n" +
                "                                    <td><a>" + rowData.siteId.link + rowData.url + "</a></td>\n" +
                "                                    <td><span class=\"label label-warning\">Pending</span></td>\n" +
                "                                    <td>\n" +
                "                                        <div class=\"form-group\">\n" +
                "                                            <button class=\"btn btn-primary\">Edit\n" +
                "                                            </button>\n" +
                "                                            <button class=\"btn btn-success\">Approve\n" +
                "                                            </button>\n" +
                "                                            <button class=\"btn btn-danger\">Disapprove\n" +
                "                                            </button>\n" +
                "                                        </div>\n" +
                "                                    </td>");
        }
    }
}


// function viewCrawlClick() {
//     prepareProductList();
//     loadAndShow(1);
// }


var productListPage = 1;
var productListTotalPage = 20;


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
