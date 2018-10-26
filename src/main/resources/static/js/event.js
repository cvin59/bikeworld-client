$(function () {

    const frontendServer = 'http://localhost:8084';
    const backendServer = 'http://localhost:8080';
    //propose event
    $('#formProposeEvent').submit((e) = > {
        e.preventDefault();
    let json = convertFormToJSON($('#formProposeEvent'));
    console.log(json);
    let formData = new FormData();
    formData.append('consumeEventString', JSON.stringify(json));
    let image = $("#image").get(0).files[0];
    formData.append('image', image);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/proposal-event",
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false

    }).done((res) = > {
        console.log(res.data);
    console.log(res.message);
    console.log(JSON.stringify(res.data.accountUsename));
    window.location.href = frontendServer + "/event";
}).
    fail((res) = > {
        console.log(res.message);
})
    ;

})
    ;

    const convertFormToJSON = (form) =
>
    {
        let array = jQuery(form).serializeArray();
        let json = {};
        jQuery.each(array, function () {
            json[this.name] = this.value || '';
        });
        return json;
    }


    //start end date
    $('#datetimepickerStart').datetimepicker({
        format: 'DD/MM/YYYY HH:mm'
    });
    $('#datetimepickerEnd').datetimepicker({
        useCurrent: false,
        format: 'DD/MM/YYYY HH:mm'
    });
    $("#datetimepickerStart").on("dp.change", function (e) {
        $('#datetimepickerEnd').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepickerEnd").on("dp.change", function (e) {
        $('#datetimepickerStart').data("DateTimePicker").maxDate(e.date);
    });

    //start end register date
    $('#datetimepickerRegiStart').datetimepicker({
        format: 'DD/MM/YYYY HH:mm'
    });
    $('#datetimepickerRegiEnd').datetimepicker({
        useCurrent: false,
        format: 'DD/MM/YYYY HH:mm'
    });
    $("#datetimepickerRegiStart").on("dp.change", function (e) {
        $('#datetimepickerRegiEnd').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepickerRegiEnd").on("dp.change", function (e) {
        $('#datetimepickerRegiStart').data("DateTimePicker").maxDate(e.date);
    });

    CKEDITOR.replace('editor', {
        filebrowserImageUploadUrl: backendServer + "/image/upload",
        height: 400
    });

    CKEDITOR.on('dialogDefinition', function (e) {
        let dialogName = e.data.name;
        let dialogDefinition = e.data.definition;

        switch (dialogName) {
            case 'image':
                // dialogDefinition.removeContents('info');
                dialogDefinition.removeContents('link');
                dialogDefinition.removeContents('advanced');
        }
    })

    let id = $("#id").val();
    console.log(id);
    if (id != "") {
        $.ajax({

            type: "GET",
            url: backendServer + "/api/event/" + id,
            dataType: 'json',
        }).done((res) = > {
            console.table(res.data);
        $.ajax({
            type: "GET",
            url: backendServer + "/api/event-image/event/" + id,
            dataType: 'json',
        }).done((res) = > {
            console.table(res);
        if (res.status_code === 1) {
            $("#eventDetailImg").attr("src", backendServer + res.data.imageLink);
        }
    }).
        fail((res) = > {
            console.log(res.message);
    })
        ;
        CKEDITOR.instances.editor.setData(res.data.description);
        $("#formCreateEvent").autofill(res.data);
    }).
        fail((res) = > {
            console.log(res.message);
    })
        ;

    }

    $('#formCreateEvent').submit((e) = > {
        // e.preventDefault;
        // var img= $("#image").get(0).files[0].size;
        // var imgsize=img/1024;
        // alert(imgsize);
        if(id === ""
)
    {
        e.preventDefault();
        let json = convertFormToJSON($('#formCreateEvent'));
        json['description'] = CKEDITOR.instances.editor.getData();
        console.log(json);
        let formData = new FormData();
        formData.append('consumeEventString', JSON.stringify(json));
        let image = $("#image").get(0).files[0];
        formData.append('image', image);
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/event",
            dataType: 'json',
            data: formData,
            contentType: false,
            processData: false

        }).done((res) = > {
            console.log(res.data);
        window.location.href = frontendServer + '/portal/event';
    }).
        fail((res) = > {
            console.log(res.message);
    })
        ;
    }
else
    {
        e.preventDefault();
        let json = convertFormToJSON($('#formCreateEvent'));
        json['description'] = CKEDITOR.instances.editor.getData();
        console.log(json);
        let formData = new FormData();
        formData.append('consumeEventString', JSON.stringify(json));
        let image = $("#image").get(0).files[0];
        formData.append('image', image);
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/api/event/" + id,
            dataType: 'json',
            data: formData,
            contentType: false,
            processData: false

        }).done((res) = > {
            console.log(res.data);
        window.location.href = frontendServer + '/portal/event';
    }).
        fail((res) = > {
            console.log(res.message);
    })
        ;
    }


})
    ;
    //
    // var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
    //     timeout: 30000,
    //     enableHighAccuracy: true,
    //     maximumAge: 3000
    // });

    // watchID;
    //
    // function onSuccess(position) {
    //     var lat = position.coords.latitude,
    //         lng = position.coords.longitude;
    //     var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    //         + lat + "," + lng +
    //         "&zoom=14&size=400x300&sensor=false";
    //     $("#googleMap").attr('src', img_url);
    //     console.log(lat, lng);
    // }
    //
    // function onError(error) {
    //     alert('code: ' + error.code + '\n' +
    //         'message: ' + error.message + '\n');
    // }

    var count = 0;
    var totalSize = 0;
    var imageFiles = [];

    // upload file event
    $("#files").change(function (e) {

        var checkExist = false;
        // hide error
        $("#tr-error").css("display", "none");
        $("#error").text("");

        $.each(e.target.files, function (index, value) {
            // reset variable
            checkExist = false;
            console.log("Upload file: " + value.name);

            // for check file extension
            var match = ["image/jpeg", "image/png", "image/jpg"];

            // get image type
            var imagetype = value.type;
            // check file extension
            if (!((imagetype == match[0]) || (imagetype == match[1]) || (imagetype == match[2]))) {
                $("#error").css("display", "block");
                $("#error").text("Please select [jpeg/png/jpg] only");
            } else {
                // check exist image in list
                for (var i = 0; i < imageFiles.length && !checkExist; i++) {
                    // if exist
                    if (value.name == imageFiles[i].name) {
                        $("#error").css("display", "block");
                        $("#error").text("You already selected image " + value.name);
                        checkExist = true;
                    }
                }

                if (!checkExist) {
                    // check totalSize
                    totalSize += value.size;
                    // maximum total size: 200MB
                    if (totalSize > 31457280) {
                        totalSize -= value.size;
                        $("#error").css("display", "block");
                        $("#error").text("Maximum size for uploading: 30MB. Your current size: " + totalSize);
                    } else { // if not over reach max size
                        // display current total size
                        if (Math.round((totalSize / 1024) / 1024) === 0) {
                            $("#totalSize").text("Total: " + totalSize / 1024 + " KB");
                        } else {
                            $("#totalSize").text("Total: " + Math.round((totalSize / 1024) / 1024) + " MB");
                        }


                        // add current file image to list
                        imageFiles[count] = value;
                        // increase count
                        count++;

                        // preview image with file reader
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $(".files").append('<tr id="' + value.name + '" class="table-tr" style="margin-top: 10px;">' +
                                '<td><img id="' + count + '" src="' + e.target.result + '"  style="width: 80px; height: 51px"/></td>' +
                                '<td><div class="imageName">' + value.name + '</div></td>' +
                                '<td><div class="imageSize">' + Math.round(value.size / 1024) + ' KB</div></td>' +
                                ' <td class="canceltd">\n' +
                                '<button id="$$$' + value.name + '"' +
                                // 'style="transition: none;\n' +
                                // '    color: white;\n' +
                                // '    width: 85px;\n' +
                                // '    font-size: 14px;\n' +
                                // '    height: 34px;\n' +
                                // '    padding-top: 5px;" ' +
                                'class="btn btn-warning' + value.name + '">\n' +
                                '<i class="glyphicon glyphicon-ban-circle"></i>\n' +
                                '<span>Remove</span>\n' +
                                '</button>\n' +
                                '<input id="$$' + value.name + '" type="checkbox" class="toggle models">\n' +
                                '</td>');

                            $("button[id='$$$" + value.name + "']").click(function (e) {
                                e.preventDefault();

                                var imageName = $(this).attr('id').replace('$$$', '');

                                remove(imageName);
                            })
                        }
                        reader.readAsDataURL(value);
                    }
                }
            }
        });

        $("#files").val('');
    });

    // remove image
    function remove(imageName) {
        console.log("Remove image: " + imageName);

        for (var i = 0; i < imageFiles.length; i++) {
            if (imageFiles[i].name.indexOf(imageName) == 0) {
                // subtract image size
                totalSize -= imageFiles[i].size;
                imageFiles.splice(i, 1);
                // subtract list length
                count--;
            }
        }

        $("table#listImage tr[id='" + imageName + "']").remove();

        $("#totalSize").text("Total: " + Math.round((totalSize / 1024) / 1024) + " MB");

    }

    $("#checkAll").change(function () {
        if (this.checked) {
            $(".models:checkbox").prop('checked', true);
        } else {
            $(".models:checkbox").prop('checked', false);
        }
    })

    $("#deleteFiles").click(function (e) {
        e.preventDefault();

        $(".models:checkbox:checked").each(function () {
            var imageName = $(this).attr('id').replace('$$', '');

            remove(imageName);
        })
    })
})