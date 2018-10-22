$(function () {
    $(document).ready(function () {
        const frontendServer = 'http://localhost:8084';
        const backendServer = 'http://localhost:8080';

        var username = $('#signin-username');
        var password = $('#signin-password');

        $('#signin-button').click(function () {
            let resp = $.ajax({
                url: backendServer + '/login',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({username: username.val(), password: password.val()}),
                success: function (xhr, status, error) {
                    console.log('123');
                    window.localStorage.setItem('JWT', xhr);
                    window.location.href = frontendServer + '/portal';
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                }
            });
        });
    });
})