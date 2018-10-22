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
                        Event Information
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <form action="/file-upload"
                                      class="dropzone needsclick"
                                      id="my-dropzone">
                                <div id="dropzonePreview"></div>
                                </form>
                                <form role="form" id="formCreateEvent" enctype="multipart/form-data">
                                    <div class="form-group">
                                        <label>Title</label>
                                        <input class="form-control" name="id" id="id" value="${id}" type="hidden">
                                        <input class="form-control" name="title">
                                    </div>
                                    <div class="form-group">
                                        <label>Location</label>
                                        <input class="form-control" name="location">
                                    </div>
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input class="form-control" name="address">
                                    </div>
                                    <%--<div id="googleMap" style="width:100%;height:400px;"></div>--%>
                                    <div class="col-md-12 form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Start Register Date</label>
                                                    <div class='input-group date' id='datetimepickerRegiStart'>
                                                        <input type='text' name="startRegisterDate" class="form-control"/>
                                                        <span class="input-group-addon">
                                        <span class="fa fa-calendar"></span>
                                         </span>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label>End Register Date</label>
                                                    <div class='input-group date' id='datetimepickerRegiEnd'>
                                                        <input type='text' name="endRegisterDate" class="form-control"/>
                                                        <span class="input-group-addon">
                                         <span class="fa fa-calendar"></span>
                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Start Date</label>
                                                    <div class='input-group date' id='datetimepickerStart'>
                                                        <input type='text' name="startDate" class="form-control"/>
                                                        <span class="input-group-addon">
                                        <span class="fa fa-calendar"></span>
                                         </span>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label>End Date</label>
                                                    <div class='input-group date' id='datetimepickerEnd'>
                                                        <input type='text' name="endDate" class="form-control"/>
                                                        <span class="input-group-addon">
                                         <span class="fa fa-calendar"></span>
                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Fee</label>
                                                <input class="form-control" name="fee">
                                            </div>
                                            <div class="col-md-3">
                                                <label>Total Slots</label>
                                                <input class="form-control" name="totalSlots">
                                            </div>
                                            <div class="col-md-3">
                                                <label>Min Slots</label>
                                                <input class="form-control" name="minSlot">
                                            </div>
                                            <div class="col-md-3">
                                                <label>Max Slots</label>
                                                <input class="form-control" name="maxSlot">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea class="form-control" name="description"></textarea>
                                    </div>

                                    <%--<div class="form-group">--%>
                                        <%--<label>Image</label>--%>
                                        <%--<input class="form-control" type="file" id="image">--%>
                                    <%--</div>--%>
                                    <%--<div class="cover-photo">--%>
                                        <%--<img id="eventDetailImg" style="width: 100%">--%>
                                        <%--<div class="trans-bg"></div>--%>
                                    <%--</div>--%>
                                    <button type="submit" class="btn btn-default">Submit</button>
                                    <button type="reset" class="btn btn-default">Reset</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
</div>
<jsp:include page="portal-js.jsp"/>
<script src="/js/event.js"></script>
<script>
    // myDropzone is the configuration for the element that has an id attribute
    // with the value my-dropzone (or myDropzone)
    Dropzone.options.myDropzone = {
        maxFiles: 3,
        init: function() {
            this.on("addedfile", function(file) {

                // Create the remove button
                var removeButton = Dropzone.createElement("<button>Remove file</button>");


                // Capture the Dropzone instance as closure.
                var _this = this;

                // Listen to the click event
                removeButton.addEventListener("click", function(e) {
                    // Make sure the button click doesn't submit the form:
                    e.preventDefault();
                    e.stopPropagation();

                    // Remove the file preview.
                    _this.removeFile(file);
                    // If you want to the delete the file on the server as well,
                    // you can do the AJAX request here.
                });

                // Add the button to the file preview element.
                file.previewElement.appendChild(removeButton);
            });
        }
    };

</script>
</body>

</html>
