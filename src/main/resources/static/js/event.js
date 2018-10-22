$(function (){

    const backendServer = "http://localhost:8080";

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
            console.log(JSON.stringify(res.data.accountUsename));
        }).fail(() => {
            console.log('propose-fail');
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

    let id = $("#id").val();

    $('#formCreateEvent').submit((e) => {
        if (id === null){
            e.preventDefault();
            let json = convertFormToJSON($('#formCreateEvent'));
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
            }).fail((res) => {
                console.log(res.message);
            });
        } else {
            e.preventDefault();
            let json = convertFormToJSON($('#formCreateEvent'));
            console.log(json);
            let formData = new FormData();
            formData.append('consumeEventString', JSON.stringify(json));
            let image = $("#image").get(0).files[0];
            formData.append('image', image);
            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/api/event",
                dataType: 'json',
                data: formData,
                contentType: false,
                processData: false

            }).done((res) => {
                console.log(res.data);
            }).fail((res) => {
                console.log(res.message);
            });
        }


    });

    $.ajax({

        type: "GET",
        url: backendServer + "/api/event/" + id,
        dataType: 'json',
    }).done((res) => {
        console.table(res.data);
        $.ajax({
            type: "GET",
            url: backendServer + "/api/event/" + id,
            dataType: 'json',
        }).done((res) => {

        }).fail((res) => {

        });
        $("#formCreateEvent").autofill(res.data);
        // $("#eventDetailImg").attr("src", backendServer + /images/res.data.imageU);
    }).fail((res) => {
        console.log(res.message);
    });


})