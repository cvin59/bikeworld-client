var orderListSize = 12;
var orderListPage = 1;
var orderListTotalPage = "";

$(function () {
    loadOrderList();
});

function loadOrderList() {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/account/buy/hiep",
        // "&page=" + orderListPage +
        // "&size=" + orderListSize +
        // "&sort=" + $("#selectDirection").val() +
        // "&sortBy=" + $("#selectSortBy").val(),
        dataType: 'json',
        success: function (res) {
            alert("Success");
            loadDataTable(res.data.orders);
        },
        error: function (e) {
            alert(e.message);
        }
    })

}


function loadDataTable(orderList) {
    let table = $('#order-list-table').DataTable({
        destroy: true,
        autoWidth: false,
        data: orderList,
        columns: [
            {data: "productName",width:"150px"},
            {data: "buyer", width:"150px"},
            {data: "orderDate",width:"200px"},
            {data: "quantity",width:"100px"},
            {data: "total",width:"100px"},
            {
                data: null,
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
                data: null,
                render: function (data, type, row) {
                    let ret;
                    const id = (row || {}).statusId;
                    var orderId=(row || {}).id
                    console.log(id);
                    switch (id) {
                        case 1:
                            ret = '<button class="btn btn-primary" type="button">Detail</button>' +
                                '<div class="dropdown">' +
                                '  <button class="btn stylish-color dropdown-toggle" type="button" data-toggle="dropdown">Choose Action\n' +
                                '  <span class="caret"></span></button>' +
                                '  <ul class="dropdown-menu">' +
                                '    <li class="btn-success"><a >Success</a></li>' +
                                '    <li class="btn-danger" onclick="rejetOrder(' + orderId+ ')"><a>Cancel</a></li>' +
                                '  </ul>\n' +
                                '</div>';
                            ;
                            break;
                        default:
                            ret = '<button class="btn btn-primary" type="button">Detail</button>';
                            break;

                    }
                    return ret;
                }
            }
        ],
        responsive: true
    });
}

function rejetOrder(id) {
    $.ajax({
        type: 'PUT',
        url: backendServer + "/api/order/reject?orderId=" + id,
        dataType: 'json',
        success(res) {
            alert(res.message);
        }, error(res) {
            alert(res.message);
        }
    })
}