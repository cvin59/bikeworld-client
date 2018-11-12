$(function () {
    var seq = $("#editProductId").val();
    alert($("#editProductId").val());
    showDetailPage(seq);
    }
)

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

function renderTable(orderList) {
    let table = $('#order-list-table').dataTable({
        destroy: true,
        data: orderList,
        columns: [
            {data: 'productName'},
            {data: 'buyer'},
            {data: 'orderDate' },
            {data: 'quantity'},
            {data: 'total'},
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
                            ret =
                                '<button class="btn btn-primary" type="button" onclick="showOrderDetail(' + orderId + ')">Detail</button>' +
                                '  <button id="btn-Action" class="btn stylish-color dropdown-toggle" type="button" data-toggle="dropdown">Choose Action\n' +
                                '  <span class="caret"></span></button>' +
                                '  <ul class="dropdown-menu">' +
                                '    <li class="btn btn-success"  onclick="confirmOrder(' + orderId + ')"><a >Confirm</a></li>' +
                                '    <li class="btn btn-danger" onclick="rejectOrder(' + orderId + ')"><a>Cancel</a></li>' +
                                '  </ul>\n';
                            break;
                        default:
                            ret = '<button class="btn btn-primary" type="button" onclick="showOrderDetail(' + orderId + ')">Detail</button>';
                            break;

                    }
                    return ret;
                }
            }
        ],
        responsive: true
    });
}

function loadOrderData(productId) {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/product/order?productId=" + productId,
        dataType: 'json',
        success: function (res) {
            renderTable(res.data);
            console.table(res.data);

            var order = res.data;
            for (i = 0; i < order.length; i++) {
                var key = 'order-' + order[i].id;
                localStorage.setItem(key, JSON.stringify(order[i]));
            }
        },
        error: function (e) {
            alert(e.message);
        }
    })
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

    $('#detail-Order-Modal').modal();
}

function rejectOrder(id) {
    $.ajax({
        type: 'PUT',
        url: backendServer + "/api/order/reject?orderId=" + id,
        dataType: 'json',
        success(res) {
            alert(res.message);
            $("#btn-Action").css('display', 'none');
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
        }, error(res) {
            alert(res.message);
        }
    })
}