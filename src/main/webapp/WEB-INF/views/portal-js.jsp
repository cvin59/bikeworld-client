<!-- jQuery -->
<script src="/vendor/jquery/jquery.min.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="/vendor/bootstrap/js/bootstrap.min.js"></script>

<!-- Metis Menu Plugin JavaScript -->

    <script src="/vendor/metisMenu/metisMenu.min.js"></script>

<!-- Morris Charts JavaScript -->
<script src="/vendor/raphael/raphael.min.js"></script>
<script src="/vendor/morrisjs/morris.min.js"></script>

<!-- DataTables JavaScript -->
<script src="/vendor/datatables/js/jquery.dataTables.min.js"></script>
<script src="/vendor/datatables-plugins/dataTables.bootstrap.min.js"></script>
<script src="/vendor/datatables-responsive/dataTables.responsive.js"></script>

<!-- Custom Theme JavaScript -->
<script src="/dist/js/sb-admin-2.js"></script>

<!--My JavaScript-->
<script src="/dist/js/moment.js"></script>
<script src="/dist/js/bootstrap-datetimepicker.js"></script>

<script>
    $(function () {
    var JWT = window.localStorage.getItem('JWT');
    $.ajax({
    url: 'http://localhost:8080/auth',
    method: 'GET',
    headers: {
    'Authorization': JWT
    },
    success: function (JWT) {
        console.log(JWT);
    },
    error: function (xhr, status, error) {
    // window.location.href = 'http://localhost:8084/login';
    }
    });
    });


</script>