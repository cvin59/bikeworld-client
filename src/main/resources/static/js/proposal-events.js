const loadDataTable = (events) => {
    var table = $('#proposal-datatables').DataTable({
        destroy : true,
        data: events,
        columns: [
            {data: "title", width: "300px"},
            {data: "location", width: "300px"},
            {data: "startDate",width: "250px"},
            {data: "endDate",width: "250px"},
            {
                data: null,
                render: function (data, type, row) {
                    let ret;
                    switch (row.status) {
                        case 1 :
                            ret = '<span style="width: 100px" id="spanPedingStatus' + row.id + '" class="badge badge-default">Pending</span>';
                            break;
                        case 2 :
                            ret = '<span style="width: 100px" id="spanApproveStatus' + row.id + '" class="badge badge-success">Approve</span>';
                            break;
                        case 3 :
                            ret = '<span style="width: 100px" id="spanNotApproveStatus' + row.id + '" class="badge badge-danger">Not Approve</span>';
                            break;

                    }
                    return ret;
                }
            }

        ],
        responsive: true
    });
    $('.dataTables_length').addClass('bs-select');
}

var data ;

var username = localStorage.getItem('username');

const loadData = () => {
    $.ajax({
        type: "GET",
        url: backendServer + "/api/proposal-event/user/" + username,
        dataType: 'json',
    }).done((res) => {
        data = res.data;
        console.table(res.data);
        loadDataTable(res.data);
    }).fail((res) => {
        console.log(res.message);
        alert(status);
    });
}

loadData();

