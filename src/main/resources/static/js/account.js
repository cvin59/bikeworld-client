$(function() {
    var JWT = window.localStorage.getItem('JWT');
    var backendServer = "http://localhost:8080";
    var frontendServer = "http://localhost:8084";

    $.ajax({
        url: backendServer + '/authMember',
        method: 'GET',
        headers: {
            'Authorization': JWT
        },
        success: function (JWT) {

        },
        error: function (xhr, status, error) {
            window.location.href = frontendServer + '/home';
        }
    });

})