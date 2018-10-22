

<div id="wrapper">

    <!-- Navigation -->
    <div class="header">
        <jsp:include page="portal-header.jsp"/>
    </div>

    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Proposal Event Management</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Proposal Events
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <table width="100%" class="table table-striped table-bordered table-hover"
                               id="dataTables-example">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>StartDate</th>
                                <th>EndDate</th>
                                <th>Status</th>
                                <%--<th>Action</th>--%>
                            </tr>
                            </thead>
                        </table>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <jsp:include page="portal-js.jsp"/>
    <script>
            const backendServer = 'http://localhost:8080';

            const loadDataTable = (events) => {
                var table = $('#dataTables-example').DataTable({
                    data: events,
                    columns: [
                        {data: "id"},
                        {data: "title"},
                        {data: "location"},
                        {data: "startDate"},
                        {data: "endDate"},
                        {
                            data: null,
                            render: function (data, type, row) {
                                let ret;
                                switch (row.status) {
                                    case 0 :
                                        ret = '<button id="btnApprove' + row.id + '" onclick="approveEvent(' + row.id + ')" class="btn btn-warning"><i class="fa fa-times"></i></button>';
                                        break;
                                    case 1 :
                                        ret = '<button id="btnNotApprove' + row.id + '" onclick="notApproveEvent(' + row.id + ')" class="btn btn-info"><i class="fa fa-check"></i></button>';
                                        break;
                                }
                                return ret;
                            }
                        }
                        // , {
                        //     data: null,
                        //     render: function (data, type, row) {
                        //         ret = '<a id="btnCreate'+row.id+'" href="proposal-event/create-event/'+row.id+'" class="btn btn-primary">Create Event</a>';
                        //         return ret;
                        //     }
                        // },

                    ],
                    columnDefs: [
                        {
                            render: function (data, type, full, meta) {
                                return "<div style='width: 200px;word-wrap: break-word'>" + data + "</div>";
                            },
                            targets: [2, 3]
                        }
                    ],
                    responsive: true
                });
            }

            $.ajax({
                type: "GET",
                url: backendServer + "/api/proposal-event",
                dataType: 'json',
            }).done((res) => {
                console.table(res.data);
                loadDataTable(res.data);
            }).fail((res) => {
                console.log(res.message);
                alert(status);
            });

            function approveEvent(id) {
                console.log(id);
                $.ajax({
                    type: "GET",
                    url: backendServer + `/api/proposal-event/approve-event/` + id,
                    dataType: 'json',
                    contentType: false,
                    processData: false

                }).done((res) => {
                    console.log(res.data);

                    $('#btnApprove' + id).replaceWith('<button id="btnNotApprove' + id + '" onclick="notApproveEvent(' + id + ')" class="btn btn-info"><i class="fa fa-check"></i></button>');
                }).fail(() => {
                    console.log('propose-fail');
                });
            }

            function notApproveEvent(id) {
                console.log(id);
                $.ajax({
                    type: "GET",
                    url: `http://localhost:8080/api/proposal-event/not-approve-event/` + id,
                    dataType: 'json',
                    contentType: false,
                    processData: false

                }).done((res) => {
                    console.log(res.data);

                    $('#btnNotApprove' + id).replaceWith('<button id="btnApprove' + id + '" onclick="approveEvent(' + id + ')" class="btn btn-warning"><i class="fa fa-times"></i></button>');
                }).fail(() => {
                    console.log('propose-fail');
                });
            }


    </script>
</div>
</body>

</html>
