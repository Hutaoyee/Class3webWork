document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('sign_in');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateInputs() {
        let allFilled = true;

        if (emailInput.value.trim() === '') {
            allFilled = false;
            emailInput.style.borderColor = 'rgb(228, 0, 127)';
        } else {
            emailInput.style.borderColor = '';
        }

        if (passwordInput.value.trim() === '') {
            allFilled = false;
            passwordInput.style.borderColor = 'rgb(228, 0, 127)';
        } else {
            passwordInput.style.borderColor = '';
        }

        const emailValid = validateEmail(emailInput.value);
        if (!emailValid) {
            emailInput.style.borderColor = 'rgb(228, 0, 127)';
        } else {
            emailInput.style.borderColor = '';
        }

        if (allFilled && emailValid) {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }

    emailInput.addEventListener('input', validateInputs);
    passwordInput.addEventListener('input', validateInputs);

    // 初始化时进行一次验证
    validateInputs();
});