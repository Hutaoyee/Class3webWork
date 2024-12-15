document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('sign_in');

    // 初始化按钮为不可点击状态
    loginButton.disabled = true;
    loginButton.classList.add('btn-disabled');

    let emailEntered = false;
    let passwordEntered = false;

    function validateForm() {
        const email = emailInput.value;
        const password = passwordInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(email) && password.trim() !== '') {
            loginButton.disabled = false;
            loginButton.classList.remove('btn-disabled');
            emailInput.classList.remove('invalid');
            passwordInput.classList.remove('invalid');
        } else {
            loginButton.disabled = true;
            loginButton.classList.add('btn-disabled');
            if (emailEntered && !emailPattern.test(email)) {
                emailInput.classList.add('invalid');
            } else {
                emailInput.classList.remove('invalid');
            }
            if (passwordEntered && password.trim() === '') {
                passwordInput.classList.add('invalid');
            } else {
                passwordInput.classList.remove('invalid');
            }
        }
    }

    emailInput.addEventListener('input', function() {
        emailEntered = true;
        validateForm();
    });

    passwordInput.addEventListener('input', function() {
        passwordEntered = true;
        validateForm();
    });
});