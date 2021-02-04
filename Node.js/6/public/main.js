let username = document.getElementById('username');
let password = document.getElementById('password');
let repassword = document.getElementById('repassword');

let usernameError = document.getElementById('usernameError');
let passwordError = document.getElementById('passwordError');
let repasswordError = document.getElementById('repasswordError');

let submit = document.getElementById('submit');

submit.addEventListener('click', () => {
    usernameError.textContent = '';
    passwordError.textContent = '';
    repasswordError.textContent = '';
    if (isEmpty(username)) {
        usernameError.textContent = 'required';

    }

    if (isEmpty(password)) {
        passwordError.textContent = 'required';
    } else if (checkPassword(password)) {
        passwordError.textContent = 'at least 8 char and contain at least one number and one letter';
    }

    if (isEmpty(repassword)) {
        repasswordError.textContent = 'required';
    } else if (checkSimilarity(password, repassword)) {
        repasswordError.textContent = 'password are not match'
    }
});


// check for empty inputs
function isEmpty(element) {
    if (element.value === '') return true;
    return false;
}

// check password 
function checkPassword(password) {
    let passRegix = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (password.value.match(passRegix)) return false;
    return true;
}

// check pass and repass is match
function checkSimilarity(password, repassword) {
    if (password.value !== repassword.value) return true;
    return false;
}

let form = document.getElementById("form");

function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);