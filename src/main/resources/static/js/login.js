$(function () {
    const frontendServer = 'http://localhost:8084';
    const backendServer = 'http://localhost:8080';

    var username = $('#signin-username');
    var password = $('#signin-password');

    var registerUsername = $('#txtUsername');
    var registerPassword = $('#txtPassword');
    var email = $('#txtEmail');
    var confirmPassword = $('#txtConfirmPassword');

    $("#formRegister").submit(async (e) => {
        e.preventDefault();
        let booleanCheckPass = await checkConfirmPass(e);
        let booleanCheckUsername = await checkUsername(e)
        if (booleanCheckPass && booleanCheckUsername) {
            await $.ajax({
                url: backendServer + '/signup',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: registerUsername.val()
                    , password: registerPassword.val()
                    , email: email.val()
                }),
                async: false,
            }).done((xhr, status, error) => {
                logIn(registerUsername.val(), registerPassword.val());
            }).fail((xhr, status) => {
                if (xhr.status === 401) {
                    alert('Invalid username or password');
                }
            });
        }
    })

    const checkUsername = async (e) => {
        let result;
        await $.ajax({
            url: backendServer + '/check-username',
            method: 'GET',
            data: {username: registerUsername.val()},
        }).done((res) => {
            if (res === 1) {
                registerUsername.addClass('valid');
                $("#lblRegisterUsername").attr("data-success", '');
                result = true;
            } else {
                registerUsername.addClass('invalid');
                $("#lblRegisterUsername").attr("data-error", 'That username is taken. Try another.');
                result = false;
            }
        }).fail((res) => {
            if (res.status === 401) {
                alert('Invalid username or password');
            }
        });
        return result;
    }

    const checkConfirmPass = (e) => {
        e.preventDefault();
        let password = registerPassword.val();
        let confirm = confirmPassword.val();
        if (password != confirm) {
            // alert("abc");
            confirmPassword.addClass('invalid');
            $("#lblConfirmPassword").attr("data-error", 'Those password does not match. Try again');
            return false;
        }
        confirmPassword.removeClass('invalid');
        confirmPassword.addClass('valid');
        $("#lblConfirmPassword").attr("data-success", '');
        return true;
    }


    $('#userLogin').submit((e) => {
        e.preventDefault();
        let usernameStr = username.val();
        let passwordStr = password.val();
        logIn(usernameStr, passwordStr);
    });

    const logIn = (username, password) => {
        $.ajax({
            url: backendServer + '/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({username: username, password: password}),
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
                '      <a class="dropdown-item" href="/user/profile">My Account</a>\n' +
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
