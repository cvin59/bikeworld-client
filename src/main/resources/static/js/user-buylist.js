var buyListPage = 1;
var buyListRecord;
var buyListTotalPage;
var username = localStorage.getItem("username");
$(function () {
    loadBuyList();
});

function loadBuyList() {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/account/sales/" + username +
            "?page=" + buyListPage +
            "&size=" + $("#selectPageSize").val(),
        // "&sort=" + $("#selectDirection").val() +
        // "&sortBy=" + $("#selectSortBy").val(),
        dataType: 'json',
        success: function (res) {
            var buy = res.data.orders;
            loadDataTable(buy);

            for (i = 0; i < buy.length; i++) {
                var key = 'buy-' + buy[i].id;
                localStorage.setItem(key, JSON.stringify(buy[i]));
            }

            buyListTotalPage = res.data.totalPage;
            buyListPage = res.data.currentPage;
            buyListRecord = res.data.totalRecord;

            buyListPagination(buyListTotalPage, buyListPage);
        },
        error: function (e) {
            alert(e.message);
        }
    })

}


function loadDataTable(buyList) {
    let table = $('#buy-list-table').DataTable({
        destroy: true,
        jQueryUI: true,
        autoWidth: false,
        data: buyList,
        searching: false, paging: false, info: false,
        columns: [
            {data: "productName", width: "150px"},
            {data: "seller", width: "150px"},
            {data: "orderDate", width: "200px"},
            {data: "quantity", width: "100px"},
            {data: "total", width: "150px"},
            {
                data: null, width: "100px",
                render: function (data, type, row) {
                    let ret;
                    var id = (row || {}).statusId;
                    var status = (row || {}).status;
                    console.log(id);
                    switch (id) {
                        case 1:
                            ret = '<span class="label label-info ">' + status + '</span>';
                            break;
                        case 2:
                            ret = '<span class="label label-primary">' + status + '</span>';
                            break;
                        case 3:
                            ret = '<span class="label label-success">' + status + '</span>';
                            break;
                        case 4:
                            ret = '<span class="label label-danger">' + status + '</span>';
                            break;

                    }
                    return ret;
                }
            },
            {
                data: null, width: "350px",
                render: function (data, type, row) {
                    let ret;
                    const id = (row || {}).statusId;
                    var buyId = (row || {}).id
                    console.log(id);
                    switch (id) {
                        case 1:
                            ret = '<div class="d-flex justify-content-center">' +
                                '<button class="btn btn-primary" type="button" onclick="showOrderDetail(' + buyId + ')">Detail</button>' +
                                '<button id="btn-cancel" class="btn btn-danger" type="button" onclick="cancelOrder(' + buyId + ')">Cancel</button>' +
                                '</div>';

                            break;
                        default:
                            ret = '<div class="d-flex justify-content-center">' +
                                '<button class="btn btn-primary" type="button" onclick="showOrderDetail(' + buyId + ')">Detail</button>' +
                                '</div>';
                            break;

                    }
                    return ret;
                }
            }
        ],
        responsive: true
    });
}

function showOrderDetail(buyId) {

}

function cancelOrder(id) {
    $.ajax({
        type: 'PUT',
        url: backendServer + "/api/order/reject?orderId=" + id,
        dataType: 'json',
        success(res) {
            alert(res.message);
            $("#btn-cancel").css('display', 'none');
        }, error(res) {
            alert(res.message);
        }
    })
}


function buyListPagination(totalPage, currentPage) {
    if (currentPage < 2) {
        document.getElementById("buyList-first-page").className = "page-item disabled";
        document.getElementById("buyList-previous-page").className = "page-item disabled";
    } else {
        document.getElementById("buyList-first-page").className = "page-item";
        document.getElementById("buyList-previous-page").className = "page-item";
    }

    if (currentPage == totalPage) {
        document.getElementById("buyList-last-page").className = "page-item disabled";
        document.getElementById("buyList-next-page").className = "page-item disabled";
    } else {
        document.getElementById("buyList-last-page").className = "page-item";
        document.getElementById("buyList-next-page").className = "page-item";
    }

    switch (totalPage) {
        case 1:
            $("#buyList-back2").css("display", "none");
            $("#buyList-back").css("display", "none");
            $("#buyList-next").css("display", "none");
            $("#buyList-next2").css("display", "none");
            break;
        case 2:
            if (currentPage == 1) {
                $("#buyList-back2").css("display", "none");
                $("#buyList-back").css("display", "none");
                $("#buyList-next").css("display", "block");
                $("#buyList-next2").css("display", "none");
            } else if (currentPage == 2) {
                $("#buyList-back2").css("display", "none");
                $("#buyList-back").css("display", "block");
                $("#buyList-next").css("display", "none");
                $("#buyList-next2").css("display", "none");
            }
            break;
        default:
            switch (currentPage) {
                case 1:
                    $("#buyList-back2").css("display", "none");
                    $("#buyList-back").css("display", "none");
                    $("#buyList-next").css("display", "block");
                    $("#buyList-next2").css("display", "block");
                    break;
                case 2:
                    $("#buyList-back2").css("display", "none");
                    $("#buyList-back").css("display", "block");
                    $("#buyList-next").css("display", "block");
                    $("#buyList-next2").css("display", "block");
                    break;
                default:
                    if (totalPage - currentPage == 0) {
                        $("#buyList-back2").css("display", "block");
                        $("#buyList-back").css("display", "block");
                        $("#buyList-next").css("display", "none");
                        $("#buyList-next2").css("display", "none");
                    } else if (totalPage - currentPage == 1) {
                        $("#buyList-back2").css("display", "block");
                        $("#buyList-back").css("display", "block");
                        $("#buyList-next").css("display", "block");
                        $("#buyList-next2").css("display", "none");
                    } else {
                        $("#buyList-next").css("display", "block");
                        $("#buyList-next2").css("display", "block");
                        $("#buyList-back2").css("display", "block");
                        $("#buyList-back").css("display", "block");
                    }
                    break;
            }
    }


    var back2 = currentPage - 2;
    $("#buyList-back2").html("  <a class=\"page-link\">" + back2 + "</a>");

    var back = currentPage - 1;
    $("#buyList-back").html("  <a class=\"page-link\">" + back + "</a>");

    $("#buyList-current-page").html("  <a class=\"page-link\">" + currentPage + "</a>");

    var next = currentPage + 1;
    $("#buyList-next").html("  <a class=\"page-link\">" + next + "</a>");

    var next2 = currentPage + 2;
    $("#buyList-next2").html("  <a class=\"page-link\">" + next2 + "</a>");
}

// $("#selectDirection").on("change", function () {
//     $("#buy-list-table").html("");
//    loadBuyList();
// })
//
// $("#selectSortBy").on("change", function () {
//     $("#buy-list-table").html("");
//    loadBuyList();
// })

$("#buyList-next").click(function () {
    buyListPage += 1;
    $("#buy-list-table").html("");
    loadBuyList();
});

$("#buyList-next2").click(function () {
    buyListPage += 2;
    $("#buy-list-table").html("");
    loadBuyList();
});

$("#buyList-back").click(function () {
    buyListPage -= 1;
    $("#buy-list-table").html("");
    loadBuyList();
});

$("#buyList-back2").click(function () {
    buyListPage -= 2;
    $("#buy-list-table").html("");
    loadBuyList();
});

$("#buyList-first-page").click(function () {
    buyListPage = 1;
    $("#buy-list-table").html("");
    loadBuyList();
});

$("#buyList-last-page").click(function () {
    buyListPage = buyListTotalPage;
    $("#buy-list-table").html("");
    loadBuyList();
});

$("#buyList-previous-page").click(function () {
    if (buyListPage - 5 < 2) {
        buyListPage = 1;
    } else {
        buyListPage -= 5;
    }
    $("#buy-list-table tbody").html("");
    loadBuyList();
});

$("#buyList-next-page").click(function () {
    if (buyListTotalPage - buyListPage < 5) {
        buyListPage = buyListTotalPage;
    } else {
        buyListPage += 5;
    }
    $("#buy-list-table").html("");
    loadBuyList();
});

$("#selectPageSize").change(function () {
    buyListPage = 1;
    loadBuyList();
})