var lat;
var lng;
$(function () {

    const frontendServer = 'http://localhost:8084';
    const backendServer = 'http://localhost:8080';

    var chosenImage;

    //propose event
    $('#formProposeEvent').submit((e) => {
        e.preventDefault();
        let username = localStorage.getItem("username");
        let json = convertFormToJSON($('#formProposeEvent'));
        json['description'] = CKEDITOR.instances.editor.getData();
        json['username'] = username;
        console.log(json);
        let formData = new FormData();
        formData.append('consumeEventString', JSON.stringify(json));
        formData.append('image', chosenImage);
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
            window.location.href = frontendServer + "/user/proposal-events";
        }).fail((res) => {
            console.log(res.message);
        });

    });



    const convertFormToJSON = (form) => {
        let array = jQuery(form).serializeArray();
        let json = {};
        jQuery.each(array, function () {
            json[this.name] = this.value || '';
        });
        return json;
    }

    //proposal events
    $('#datetimepickerProposalStart').datetimepicker({
        format: 'DD/MM/YYYY HH:mm'
    });
    $('#datetimepickerProposalEnd').datetimepicker({
        useCurrent: false,
        format: 'DD/MM/YYYY HH:mm'
    });
    $("#datetimepickerProposalStart").on("change.datetimepicker", function (e) {
        $('#datetimepickerProposalEnd').datetimepicker('minDate', e.date);
    });
    $("#datetimepickerProposalEnd").on("change.datetimepicker", function (e) {
        $('#datetimepickerProposalStart').datetimepicker('maxDate', e.date);
    });

    //events
    //start end date
    $('#datetimepickerStart').datetimepicker({
        useCurrent: false,
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

    // start end register date
    $('#datetimepickerRegiStart').datetimepicker({
        useCurrent: false,
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

    $("#datetimepickerRegiEnd").on("dp.change", function (e) {
        $('#datetimepickerStart').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepickerStart").on("dp.change", function (e) {
        $('#datetimepickerRegiEnd').data("DateTimePicker").maxDate(e.date);
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
        }).done((res) => {
            console.table(res.data);
            $.ajax({
                type: "GET",
                url: backendServer + "/api/event-image/event/" + id,
                dataType: 'json',
            }).done((res) => {
                console.table(res);
                if (res.status_code === 1) {
                    $("#blah").attr("src", backendServer + res.data.imageLink);
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
        e.preventDefault();
        if (validate()) {
            if (id === "") {
                let json = convertFormToJSON($('#formCreateEvent'));
                json['description'] = CKEDITOR.instances.editor.getData();
                json['latitude'] = lat;
                json['longitude'] = lng;
                console.log(json);
                let formData = new FormData();
                formData.append('consumeEventString', JSON.stringify(json));
                let image = $("#image").get(0).files[0];
                formData.append('image', chosenImage);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/event",
                    dataType: 'json',
                    data: formData,
                    contentType: false,
                    processData: false

                }).done((res) => {
                    console.log(res.data);
                    console.log(res.status_code);
                    alert(res.message);
                }).fail((res) => {
                    console.log(res.message);
                });
            } else {
                e.preventDefault();
                let json = convertFormToJSON($('#formCreateEvent'));
                json['description'] = CKEDITOR.instances.editor.getData();
                json['latitude'] = lat;
                json['longitude'] = lng;
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
                    console.log(res.status_code);
                    alert(res.message);
                }).fail((res) => {
                    console.log(res.message);
                });
            }
        }
    });

    const validate = () => {
        let min = parseInt($("input[name=minSlot]").val());
        let max = parseInt($("input[name=maxSlot]").val());
        let total = parseInt($("input[name=totalSlots]").val());
        if (min >= max) {
            $("#error").css("display", "block");
            $("#error").text("Min slots must be less than Max Slots");
            return false;
        }
        if (max >= total) {
            $("#error").css("display", "block");
            $("#error").text("Max slots must be less than Total Slots");
            return false;
        }
        let checkDate = Date.daysBetween(toOjectDAte($('input[name=startDate]').val()), toOjectDAte($('input[name=endDate]').val()));
        let checkRegisterDate = Date.daysBetween(toOjectDAte($('input[name=startRegisterDate]').val()), toOjectDAte($('input[name=endRegisterDate]').val()));
        let checkRegisterDateBeforeOpenDate = Date.daysBetween(toOjectDAte($('input[name=endRegisterDate]').val()), toOjectDAte($('input[name=startDate]').val()));

        if (checkRegisterDate <= 0) {
            $("#error").css("display", "block");
            $("#error").text("Start Register Date must be less than End Register Date");
            return false;
        }
        if (checkDate <= 0) {
            $("#error").css("display", "block");
            $("#error").text("Start Open Date must be less than End Open Date");
            return false;
        }
        if (checkRegisterDateBeforeOpenDate <= 0) {
            $("#error").css("display", "block");
            $("#error").text(" End Register Date must be less than Start Open Date");
            return false;
        }
        return true;
    }

    var totalSize = 0;
    var checkName = "";

    $("#image").change((e) => {
        let image = $("#image").get(0).files[0];

        var checkExist = false;
        // hide error
        $("#tr-error").css("display", "none");
        $("#error").text("");

        console.log(Math.round((image.size / 1024) / 1024));

        checkExist = false;
        console.log("Upload image: " + image.name);

        // for check file extension
        var match = ["image/jpeg", "image/png", "image/jpg"];

        // get image type
        let imageType = image.type;
        // check file extension
        if (!((imageType === match[0]) || (imageType === match[1]) || (imageType === match[2]))) {
            $("#error").css("display", "block");
            $("#error").text("Please select [jpeg/png/jpg] only");
        } else {
            // check exist image
            // if exist
            if (image.name === checkName) {
                $("#error").css("display", "block");
                $("#error").text("You already selected image " + image.name);
                console.log("checkName");
                checkExist = true;
            }

            if (!checkExist) {
                // check totalSize
                totalSize += image.size;
                // maximum total size: 200MB
                if (totalSize > 31457280) {
                    totalSize -= image.size;
                    $("#error").css("display", "block");
                    $("#error").text("Maximum size for uploading: 30MB. Your current size: " + totalSize);
                } else { // if not over reach max size
                    // display current total size
                    if (Math.round((totalSize / 1024) / 1024) === 0) {
                        $("#totalSize").text("Total: " + totalSize / 1024 + " KB");
                    } else {
                        $("#totalSize").text("Total: " + Math.round((totalSize / 1024) / 1024) + " MB");
                    }

                    checkName = image.name;
                    console.log(checkName);

                    // preview image with file reader
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $(".files").html('<tr id="' + image.name + '" class="table-tr" style="margin-top: 10px;">' +
                            '<td><img src="' + e.target.result + '"  style="width: 80px; height: 51px"/></td>' +
                            '<td><div class="imageName">' + image.name + '</div></td>' +
                            '<td><div class="imageSize">' + Math.round(image.size / 1024) + ' KB</div></td>' +
                            ' <td class="canceltd">\n' +
                            '<button id="$$$' + image.name + '"' +
                            // 'style="transition: none;\n' +
                            // '    color: white;\n' +
                            // '    width: 85px;\n' +
                            // '    font-size: 14px;\n' +
                            // '    height: 34px;\n' +
                            // '    padding-top: 5px;" ' +
                            'class="btn btn-warning' + image.name + '">\n' +
                            '<i class="glyphicon glyphicon-ban-circle"></i>\n' +
                            '<span>Remove</span>\n' +
                            '</button>\n' +
                            '</td>');

                        $("button[id='$$$" + image.name + "']").click(function (e) {
                            e.preventDefault();

                            var imageName = $(this).attr('id').replace('$$$', '');

                            remove(imageName);
                        })
                    }
                    reader.readAsDataURL(image);
                }
            }
        }

        $("#image").val("");
        chosenImage = image;
    });

    // remove image
    function remove(imageName) {
        console.log("Remove image: " + imageName);

        $("table#listImage tr[id='" + imageName + "']").remove();

        $("#totalSize").text("Total: " + Math.round((totalSize / 1024) / 1024) + " MB");
        $("#image").val("");
        checkName = '';
        chosenImage = '';
    };
});
var placeSearch, autocomplete;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    lat = place.geometry.location.lat();
    lng = place.geometry.location.lng();
    console.table(place);
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}