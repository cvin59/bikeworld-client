<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta title="viewport" content="width=device-width, initial-scale=1">
    <meta title="description" content="">
    <meta title="author" content="">

    <title>Manage Event</title>
</head>

<body>

<div id="wrapper">

    <!-- Navigation -->
    <div class="header">
        <jsp:include page="portal-header.jsp"/>
    </div>

    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Event Management</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Crawl Management
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <button class="btn btn-primary btn-lg">Crawl</button>
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
</div>
<jsp:include page="portal-js.jsp"/>
</body>

</html>
