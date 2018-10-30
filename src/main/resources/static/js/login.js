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

    const modifyNavBar = (xhr) => {
        $.ajax({
            url: 'http://localhost:8080/authMember',
            method: 'GET',
            headers: {
                'Authorization': xhr
            },
            async: false,
        }).done((res) => {
            console.log(res);
            window.localStorage.setItem('username', res);
            $("#navTabsLogin").empty();
            $("#navTabsLogin").append('<div class="dropdown">\n' +
                '\n' +
                '    <!--Trigger-->\n' +
                '    <a class="nav-link font-weight-bold dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"\n' +
                '      aria-haspopup="true" aria-expanded="false">' +
                '<span class="clearfix d-none d-sm-inline-block"><i class="fa fa-user"></i>' + res + '</span></a>\n' +
                '\n' +
                '\n' +
                '    <!--Menu-->\n' +
                '    <div class="dropdown-menu dropdown-menu-right dropdown-danger">\n' +
                '      <a class="dropdown-item" href="/user/account">My Account</a>\n' +
                '      <a class="dropdown-item" id="logoutBtn">Logout</a>\n' +
                '    </div>\n' +
                '  </div>');
        }).fail(() => {

        });
    }

    if (window.localStorage.getItem('JWT') != null) {
        modifyNavBar(window.localStorage.getItem('JWT'));
    }

    $('#logoutBtn').click(function () {
        localStorage.removeItem('JWT');
        localStorage.removeItem('username');
        window.location.reload();
        // modifyNavBar(JWT);
    });
})
