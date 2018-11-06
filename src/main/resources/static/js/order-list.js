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
            {data: "productName"},
            {data: "buyer"},
            {data: "quantity"},
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
            {data: "orderDate"},
            {data: "total"},
            {
                data: null,
                render: function (data, type, row) {
                    let ret;
                    const id = (row || {}).statusId;
                    console.log(id);
                    switch (id) {
                        case 1:
                            ret = '<div>' +
                                '<button class="btn btn-success" type="button" value="Success">' +
                                '<button class="btn btn-danger" type="button" value="Cancel">' +
                                '</div>';
                            break;
                        default:
                            break;

                    }
                    return ret;
                }
            }
        ],
        responsive: true
    });
}