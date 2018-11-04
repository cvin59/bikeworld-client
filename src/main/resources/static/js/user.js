$(function () {
    var username = localStorage.getItem("username");
    $("#edtUsername").val(username);
})

$("#edt-profile-form").submit(function (e) {
    e.preventDefault();
    var objectData = {
        lastname: $("#edtLastname").val(),
        firstname: $("#edtFirstname").val(),
        accountUser: $("#edtUsername").val(),
        email: $("#edtEmail").val(),
        address: $("#edtLocation").val(),
        phone: $("#edtPhone").val(),

    }
    alert($("#edtEmail").val());

    var objectDataString = JSON.stringify(objectData);
    var fileUpload = $("#imageUpload").get(0).files[0];


    alert(objectDataString)
    var formData = new FormData();
    formData.append('profileModelString', objectDataString);
    formData.append('avatar', fileUpload);

    $.ajax({
        type: 'PUT',
        url: backendServer + "/api/account/profile/edit",
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,

        success: function (response) {
            alert("Success")
        },
        error: function (e) {
            alert("ERROR load: ", e);
            console.log(e);
        }
    });
})