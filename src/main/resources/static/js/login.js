$(function () {
    const frontendServer = 'http://localhost:8084';
    const backendServer = 'http://localhost:8080';

    var username = $('#signin-username');
    var password = $('#signin-password');

    $('#userLogin').submit((e) => {
        e.preventDefault();
        logIn(e);
    });

    const logIn = (e) => {
        e.preventDefault();
        $.ajax({
            url: backendServer + '/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({username: username.val(), password: password.val()}),
            async: false,
        }).done((xhr, status, error) => {
            window.localStorage.setItem('JWT', xhr);
            location.reload();
        }).fail((xhr, status) => {
                if (xhr.status === 401) {
                    alert('Invalid username or password');
                }
            });
    }

    const checkMember = (xhr) => {
        $.ajax({
            url: 'http://localhost:8080/authMember',
            method: 'GET',
            headers: {
                'Authorization': xhr
            },
            async: false,
        }).done((xhr) => {
            console.log(xhr);
            $("#navTabsLogin").empty();
            $("#navTabsLogin").append('<div class="dropdown">\n' +
                '\n' +
                '    <!--Trigger-->\n' +
                '    <a class="nav-link font-weight-bold dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"\n' +
                '      aria-haspopup="true" aria-expanded="false">' +
                '<span class="clearfix d-none d-sm-inline-block"><i class="fa fa-user"></i>'+xhr+'</span></a>\n' +
                '\n' +
                '\n' +
                '    <!--Menu-->\n' +
                '    <div class="dropdown-menu dropdown-menu-right dropdown-danger">\n' +
                '      <a class="dropdown-item" href="#">Profile</a>\n' +
                '      <a class="dropdown-item" id="logoutBtn">Logout</a>\n' +
                '    </div>\n' +
                '  </div>');
        }).fail(() => {

        });
    }

    if (window.localStorage.getItem('JWT') != null) {
        checkMember(window.localStorage.getItem('JWT'));
    }


    $('#logoutBtn').click(function () {
        var JWT = window.localStorage.removeItem('JWT');
        window.location.reload();
        checkMember(JWT);
    });
})
