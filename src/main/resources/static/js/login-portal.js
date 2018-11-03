$(function () {
    $(document).ready(function () {
        const frontendServer = 'http://localhost:8084';
        const backendServer = 'http://localhost:8080';

        var username = $('#signin-username');
        var password = $('#signin-password');

        $('#formLoginPortal').submit(function (e) {
            e.preventDefault();
            let resp = $.ajax({
                url: backendServer + '/login',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({username: username.val(), password: password.val()}),
                success: function (xhr, status, error) {
                    window.localStorage.setItem('JWT', xhr);

                    $.ajax({
                        url: 'http://localhost:8080/auth',
                        method: 'GET',
                        headers: {
                            'Authorization': xhr
                        },
                        success: function (xhr) {
                            console.log(xhr);
                            window.location.href = frontendServer + '/portal';
                        },
                        error: function (xhr, status, error) {
                            console.log(error);
                            alert("You have no permission");
                        }
                    })

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