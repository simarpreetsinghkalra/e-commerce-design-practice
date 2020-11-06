let user = JSON.parse(window.localStorage.getItem('user'));
if (user) {
    window.location.href = "shop.html";
} else {
    user = {};
}

function submitForm() {
    if (validateForm()) {
        let form = document.forms['reg-form'];
        
        user = {
            name: form['name'].value,
            email: form['email'].value,
            password: form['password'].value,
            address: form['address'].value,
            city: form['city'].value,
            province: form['province'].value,
            cc: form['cc'].value
        }
        
        window.localStorage.setItem('user',JSON.stringify(user));
        window.location.href = "shop.html";
    }
}

function validateForm() {
    let form = document.forms['reg-form'];
    let validated = true;
    
    // required validations
    if (form['name'].value && form['name'].value.trim().length > 0) {
        validated = validated && true;
        document.getElementById('name-err').innerHTML = '';
    } else {
        validated = validated && false;
        document.getElementById('name-err').innerHTML = 'Please enter name';
    }

    if (form['password'].value && form['password'].value.length > 0) {
        validated = validated && true;
        document.getElementById('pass-err').innerHTML = '';
    } else {
        validated = validated && false;
        document.getElementById('pass-err').innerHTML = 'Please enter password';
    }

    if (form['address'].value && form['address'].value.trim().length > 0) {
        validated = validated && true;
        document.getElementById('address-err').innerHTML = '';
    } else {
        validated = validated && false;
        document.getElementById('address-err').innerHTML = 'Please enter address';
    }

    if (form['city'].value && form['city'].value.trim().length > 0) {
        validated = validated && true;
        document.getElementById('city-err').innerHTML = '';
    } else {
        validated = validated && false;
        document.getElementById('city-err').innerHTML = 'Please enter city';
    }
    if (form['province'].value && form['province'].value.trim().length > 0) {
        validated = validated && true;
        document.getElementById('province-err').innerHTML = '';
    } else {
        validated = validated && false;
        document.getElementById('province-err').innerHTML = 'Please select province';
    }


    // password match

    if (form['password'].value === form['cpassword'].value) {
        validated = validated && true;
        document.getElementById('cpass-err').innerHTML = '';
    } else {
        validated = validated && false;
        document.getElementById('cpass-err').innerHTML = 'Password and Confirm password do not match';
    }


    // format validation
    let emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9]*$/;
    let ccPattern = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/

    if (emailPattern.test(form['email'].value)) {
        validated = validated && true;
        document.getElementById('email-err').innerHTML = '';
    } else {
        validated = validated && false;
        document.getElementById('email-err').innerHTML = 'Email format is invalid';
    }

    if (ccPattern.test(form['cc'].value)) {
        validated = validated && true;
        document.getElementById('credit-err').innerHTML = '';
    } else {
        validated = validated && false;
        document.getElementById('credit-err').innerHTML = 'Credit card no. format is invalid';
    }

    return validated;
}