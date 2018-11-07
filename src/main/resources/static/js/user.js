$(function () {
    var username = localStorage.getItem("username");
    $("#edtUsername").val(username);

    $.ajax({
        type: 'GET',
        url: backendServer + "/api/account/profile/" + username,
        dataType: 'json',
        success(res) {
            alert("ok");
            if (res.data != null) {
                $("#edtFirstname").val(res.data.firstName);
                $("#edtLastname").val(res.data.lastName);
                $("#edtEmail").val(res.data.email);
                $("#edtPhone").val(res.data.phone);
                $("#edtLocation").val(res.data.address);
                $("#imagePreview").css('background-image', 'url(' + backendServer+res.data.avatarLink +')');
            }
        },
        error(e) {
            console.log(e);
        }
    });
});

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

    var objectDataString = JSON.stringify(objectData);
    var fileUpload = $("#imageUpload").get(0).files[0];

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