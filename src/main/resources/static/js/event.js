$(function (){

    const frontendServer = 'http://localhost:8084';
    const backendServer = 'http://localhost:8080';
    //propose event
    $('#formProposeEvent').submit((e) => {
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

        }).done((res) => {
            console.log(res.data);
            console.log(res.message);
            console.log(JSON.stringify(res.data.accountUsename));
            window.location.href = frontendServer + "/event";
        }).fail((res) => {
            console.log(res.message);
        });

    });

    const convertFormToJSON = (form) =>{
        let array = jQuery(form).serializeArray();
        let json = {};
        jQuery.each(array, function() {
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

    CKEDITOR.replace( 'editor', {
        filebrowserImageUploadUrl: backendServer + "/image/upload",
        height: 400
    });

    CKEDITOR.on('dialogDefinition', function(e){
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
        }).done((res) => {
            console.table(res.data);
            $.ajax({
                type: "GET",
                url: backendServer + "/api/event-image/event/" + id,
                dataType: 'json',
            }).done((res) => {
                console.table(res);
                if (res.status_code === 1) {
                    $("#eventDetailImg").attr("src", backendServer + res.data.imageLink);
                }
            }).fail((res) => {
                console.log(res.message);
            });
            CKEDITOR.instances.editor.setData(res.data.description);
            $("#formCreateEvent").autofill(res.data);
        }).fail((res) => {
            console.log(res.message);
        });

    }

    $('#formCreateEvent').submit((e) => {
        e.preventDefault;
        var img= $("#image").get(0).files[0].size;
        var imgsize=img/1024;
        alert(imgsize);
        if (id === ""){
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

            }).done((res) => {
                console.log(res.data);
                window.location.href = frontendServer + '/portal/event';
            }).fail((res) => {
                console.log(res.message);
            });
        } else {
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
                url: "http://localhost:8080/api/event/" + id ,
                dataType: 'json',
                data: formData,
                contentType: false,
                processData: false

            }).done((res) => {
                console.log(res.data);
                window.location.href = frontendServer + '/portal/event';
            }).fail((res) => {
                console.log(res.message);
            });
        }


    });
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
})