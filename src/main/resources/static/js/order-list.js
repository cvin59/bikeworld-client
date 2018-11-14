var orderListPage = 1;
var orderListRecord;
var orderListTotalPage;
var interval;
var username = localStorage.getItem("username");
$(function () {
    loadOrderList();
});

function loadOrderList() {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/account/buy/" + username +
            "?page=" + orderListPage +
            "&size=" + $("#selectPageSize").val(),
        // "&sort=" + $("#selectDirection").val() +
        // "&sortBy=" + $("#selectSortBy").val(),
        dataType: 'json',
        success: function (res) {
            var order = res.data.orders;
            loadDataTable(order);

            for (i = 0; i < order.length; i++) {
                var key = 'order-' + order[i].id;
                //   countDown(res.data.orders[i].expiredDate);
                localStorage.setItem(key, JSON.stringify(order[i]));
            }

            orderListTotalPage = res.data.totalPage;
            orderListPage = res.data.currentPage;
            orderListRecord = res.data.totalRecord;

            orderListPagination(orderListTotalPage, orderListPage);
        },
        error: function (e) {
            alert(e.message);
        }
    })

}


function loadDataTable(orderList) {
    let table = $('#order-list-table').DataTable({
        destroy: true,
        jQueryUI: true,
        autoWidth: false,
        data: orderList,
        searching: false, paging: false, info: false,
        columns: [
            {data: "productName", width: "150px"},
            {data: "buyer", width: "150px"},
            {data: "orderDate", width: "150px"},
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
                    var orderId = (row || {}).id
                    console.log(id);
                    switch (id) {
                        case 1:
                            ret = '<div class="d-flex justify-content-center">' +
                                '<button class="btn btn-primary" type="button" onclick="showOrderDetail(' + orderId + ')">Detail</button>' +
                                '  <button id="btn-Action" class="btn stylish-color dropdown-toggle" type="button" data-toggle="dropdown">Choose Action\n' +
                                '  <span class="caret"></span></button>' +
                                '  <ul class="dropdown-menu">' +
                                '    <li class="btn btn-success"  onclick="confirmOrder(' + orderId + ')"><a >Confirm</a></li>' +
                                '    <li class="btn btn-danger" onclick="rejectOrder(' + orderId + ')"><a>Cancel</a></li>' +
                                '  </ul>\n' +
                                '</div>';
                            break;
                        default:
                            ret = '<div class="d-flex justify-content-center">' +
                                '<button class="btn btn-primary" type="button" onclick="showOrderDetail(' + orderId + ')">Detail</button>' +
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

function showOrderDetail(orderId) {
    var key = 'order-' + orderId;
    var order = JSON.parse(localStorage.getItem(key));

    $("#buyerUsername").val(order.buyer)
    $("#receiverName").val(order.reciever);
    $("#orderQuantity").val(order.quantity);
    $("#orderPhone").val(order.phoneContact);
    $("#totalPrice").val(order.total);
    $("#orderAddress").val(order.deliveryAddr);
    $("#orderExpired").val(order.expiredDate);
    $('#detail-Order-Modal').modal();
    countDown(order.expiredDate, order.statusId);
}

function rejectOrder(id) {
    $.ajax({
        type: 'PUT',
        url: backendServer + "/api/order/reject?orderId=" + id,
        dataType: 'json',
        success(res) {
            alert(res.message);
            $("#btn-Action").css('display', 'none');
            clearInterval(interval);
            $("#orderCountDown").val("N/a");
        }, error(res) {
            alert(res.message);
        }
    })
}

function confirmOrder(id) {
    $.ajax({
        type: 'PUT',
        url: backendServer + "/api/order/confirm?orderId=" + id,
        dataType: 'json',
        success(res) {
            alert(res.message);
            $("#btn-Action").css('display', 'none');
            clearInterval(interval);
            $("#orderCountDown").val("N/a");
        }, error(res) {
            alert(res.message);
        }
    })
}

function orderListPagination(totalPage, currentPage) {
    if (currentPage < 2) {
        document.getElementById("orderList-first-page").className = "page-item disabled";
        document.getElementById("orderList-previous-page").className = "page-item disabled";
    } else {
        document.getElementById("orderList-first-page").className = "page-item";
        document.getElementById("orderList-previous-page").className = "page-item";
    }

    if (currentPage == totalPage) {
        document.getElementById("orderList-last-page").className = "page-item disabled";
        document.getElementById("orderList-next-page").className = "page-item disabled";
    } else {
        document.getElementById("orderList-last-page").className = "page-item";
        document.getElementById("orderList-next-page").className = "page-item";
    }

    switch (totalPage) {
        case 1:
            $("#orderList-back2").css("display", "none");
            $("#orderList-back").css("display", "none");
            $("#orderList-next").css("display", "none");
            $("#orderList-next2").css("display", "none");
            break;
        case 2:
            if (currentPage == 1) {
                $("#orderList-back2").css("display", "none");
                $("#orderList-back").css("display", "none");
                $("#orderList-next").css("display", "block");
                $("#orderList-next2").css("display", "none");
            } else if (currentPage == 2) {
                $("#orderList-back2").css("display", "none");
                $("#orderList-back").css("display", "block");
                $("#orderList-next").css("display", "none");
                $("#orderList-next2").css("display", "none");
            }
            break;
        default:
            switch (currentPage) {
                case 1:
                    $("#orderList-back2").css("display", "none");
                    $("#orderList-back").css("display", "none");
                    $("#orderList-next").css("display", "block");
                    $("#orderList-next2").css("display", "block");
                    break;
                case 2:
                    $("#orderList-back2").css("display", "none");
                    $("#orderList-back").css("display", "block");
                    $("#orderList-next").css("display", "block");
                    $("#orderList-next2").css("display", "block");
                    break;
                default:
                    if (totalPage - currentPage == 0) {
                        $("#orderList-back2").css("display", "block");
                        $("#orderList-back").css("display", "block");
                        $("#orderList-next").css("display", "none");
                        $("#orderList-next2").css("display", "none");
                    } else if (totalPage - currentPage == 1) {
                        $("#orderList-back2").css("display", "block");
                        $("#orderList-back").css("display", "block");
                        $("#orderList-next").css("display", "block");
                        $("#orderList-next2").css("display", "none");
                    } else {
                        $("#orderList-next").css("display", "block");
                        $("#orderList-next2").css("display", "block");
                        $("#orderList-back2").css("display", "block");
                        $("#orderList-back").css("display", "block");
                    }
                    break;
            }
    }


    var back2 = currentPage - 2;
    $("#orderList-back2").html("  <a class=\"page-link\">" + back2 + "</a>");

    var back = currentPage - 1;
    $("#orderList-back").html("  <a class=\"page-link\">" + back + "</a>");

    $("#orderList-current-page").html("  <a class=\"page-link\">" + currentPage + "</a>");

    var next = currentPage + 1;
    $("#orderList-next").html("  <a class=\"page-link\">" + next + "</a>");

    var next2 = currentPage + 2;
    $("#orderList-next2").html("  <a class=\"page-link\">" + next2 + "</a>");
}

// $("#selectDirection").on("change", function () {
//     $("#order-list-table").html("");
//     loadOrderList();
// })
//
// $("#selectSortBy").on("change", function () {
//     $("#order-list-table").html("");
//     loadOrderList();
// })

$("#orderList-next").click(function () {
    orderListPage += 1;
    $("#order-list-table").html("");
    loadOrderList();
});

$("#orderList-next2").click(function () {
    orderListPage += 2;
    $("#order-list-table").html("");
    loadOrderList();
});

$("#orderList-back").click(function () {
    orderListPage -= 1;
    $("#order-list-table").html("");
    loadOrderList();
});

$("#orderList-back2").click(function () {
    orderListPage -= 2;
    $("#order-list-table").html("");
    loadOrderList();
});

$("#orderList-first-page").click(function () {
    orderListPage = 1;
    $("#order-list-table").html("");
    loadOrderList();
});

$("#orderList-last-page").click(function () {
    orderListPage = orderListTotalPage;
    $("#order-list-table").html("");
    loadOrderList();
});

$("#orderList-previous-page").click(function () {
    if (orderListPage - 5 < 2) {
        orderListPage = 1;
    } else {
        orderListPage -= 5;
    }
    $("#order-list-table tbody").html("");
    loadOrderList();
});

$("#orderList-next-page").click(function () {
    if (orderListTotalPage - orderListPage < 5) {
        orderListPage = orderListTotalPage;
    } else {
        orderListPage += 5;
    }
    $("#order-list-table").html("");
    loadOrderList();
});

$("#selectPageSize").change(function () {
    orderListPage = 1;
    loadOrderList();
});

function countDown(date, statusId) {
    if (statusId == 1) {
        var countDownDate = new Date(date).getTime();
    // Update the count down every 1 second
         interval = setInterval(function () {
            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            $("#orderCountDown").val(days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ");

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(interval);
                $("#orderCountDown").val("EXPIRED");
            }
        }, 1000);
    }else{
        clearInterval(interval);
        $("#orderCountDown").val("N/a");
    }
}