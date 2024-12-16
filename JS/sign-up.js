document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    const emailInput = document.querySelector('input[type="email"]');
    const checkbox = document.querySelector('#flexCheckDefault');
    const submitButton = document.querySelector('#sign_in');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateInputs() {
        let allFilled = true;
        inputs.forEach(input => {
            if (input.type !== 'checkbox' && input.value.trim() === '') {
                allFilled = false;
                input.style.borderColor = 'rgb(228, 0, 127)';
            } else {
                input.style.borderColor = '';
            }
        });

        const emailValid = validateEmail(emailInput.value);
        if (!emailValid) {
            emailInput.style.borderColor = 'rgb(228, 0, 127)';
        } else {
            emailInput.style.borderColor = '';
        }

        const checkboxChecked = checkbox.checked;

        if (allFilled && emailValid && checkboxChecked) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', validateInputs);
    });

    checkbox.addEventListener('change', validateInputs);

    // 初始化时进行一次验证
    validateInputs();
});