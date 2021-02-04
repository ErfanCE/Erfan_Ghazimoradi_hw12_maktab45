$('#form').on('submit', function (e) {
    e.preventDefault();

    let data = {
        username: $('.username input').val(),
        password: $('.password input').val()
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8000/login",
        data,
        success: function (data) {
            displayAlert(data);
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
});

function displayAlert(status) {
    switch (status) {
        case 'empty':
            createAlert('c3b70eb3', 'نام کاربری و رمز عبور را وارد کنید');
            break;
        case 'success':
            createAlert('036430b3', 'شما با موفقیت وارد شدید');
            break;
        case 'notMatch':
            createAlert('8a0202b3', 'نام کاربری با رمز عبور مطابقت ندارد');
            break;
        case 'notFound':
            createAlert('8a0202b3', 'کاربری با این نام کاربری ثبت نشده');
            break;
        default:
            console.log('not defined status');
            break;
    }
}

function createAlert(color, statusMsg) {
    $('.alert').css('display', 'block');
    $('.alert').html(`<p>${statusMsg}</p>`);
    $('.alert').css('background-color', `#${color}`);
    setTimeout(function () {
        $('.alert').fadeOut(500); // or fade, css display however you'd like.
    }, 1500);
}