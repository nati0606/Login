import * as ajax from "./modules/ajax.js";

var color = "";
var numKlead = "";
var cont = 0;
var setting = null;
var user = "";
var userJSON = "";
var employee = {};

//to start
async function checkToken() {
    userJSON = localStorage.getItem("userLogin");
    if (userJSON == null) {
        user = 0;
    } else {
        user = JSON.parse(userJSON);
        setting = await ajax.checkToken(user.token);
        if (setting == 0) {
            user = 0;
        } else {
            user = setting;
            changeToken();
        }
    }
    return user;
}

async function changeToken() {
    var token = "Token" + (Math.floor(Math.random() * 99999999) + 10000000);
    setting = await ajax.changeToken(user[0], token);
    var status = 0;
    status = confirm(setting);
    if(status == 1) {
        user[0].token = token;
        saveToLS();
    }
}

//return color numPad
function click() {
    color = "green";
    numKlead = "";
    return color;
}

//clicks numPad
function compose(btn) {
    color = "pink";
    numKlead += btn.innerText;
    console.log("code tapé: " + numKlead);
    return color;
}

//reset color in timout
function timeout() {
        numKlead = "";
        color = "green";
        return color;
}

//check length code
function checkLength() {
    if (numKlead.length == 4) {
        cont ++;
        var x = true;
    }
    return x;
}

async function checkLogin() {
    setting = await ajax.checkPassword(numKlead);
    if (setting.length != 0) {
        user = setting; //array info user
        cont = 0;
        saveToLS();
    } else {
        if (cont < 4) {
            user = 0;
        } else {
            user = 100
        }
    }
    return user;
}

//save info user to local storage
function saveToLS() {
    var userJSON = JSON.stringify(user[0]);
    localStorage.setItem("userLogin", userJSON);
}

function checkRole() {
    var x = user[0].role_id;
    return x;
}

function logout() {
    localStorage.removeItem("userLogin");
}

async function createUser(theForm){
    var token = "Token" + (Math.floor(Math.random() * 99999999) + 10000000);
    var formData = new FormData(theForm);
    formData.append("token", token); // .append ajoute un élément à l'object
    var arr = [];
    for (let input of formData.entries()) {
        arr.push(input[1]);
    }
    setting = await ajax.createUser(arr);
    status = confirm(setting);
    return status;
}

async function checkValsCreate(input, role) {
    var fName = confirmName(input[0].value);
    var lName = confirmName(input[1].value);
    var tz = await confirmTz(input[2].value)
    var tel = confirmTel(input[3].value)
    var email = confirmEmail(input[4].value);
    var password = confirmPassword(input[5].value);
    var role = confirmRole(role.value);

    //status 1: field empty. 2: code != 4 num. 3: role undefined. 4: invalid email. 5: invalid phone. 6: tz != 9 digits. 7: invalid tz
    var allStatus = [fName + lName + tz + tel + email + password + role, fName, lName, tz, tel, email, password, role];

    return allStatus;
}

function checkValsUpdate(input) {
    var tel = confirmTel(input[0].value)
    var email = confirmEmail(input[1].value);
    var password = confirmPassword(input[2].value);

    //status 1: field empty. 2: code != 4 num. 4: invalid email. 5: invalid phone.
    var allStatus = [tel + email + password, tel, email, password];
    return allStatus;
}

//check values
function confirmName(x) {
    var status = 0;
    if(x == "") {
        status = 1;
    }
    return status;
}

//check values
function confirmPassword(x) {
    var status = 0;
    if(x == "") {
        status = 1;
    } else if(x.length != 4) {
        status = 2;
    }
    return status;
}

//check values
function confirmRole(x) {
    var status = 0;
    if(x == 0) {
        status = 3;
    }
    return status;
}

//check values
async function confirmTz(x) {
    var status = 0;
    var numFormat = /^\d+$/;
    if(x == 0) {
        status = 1;
    } else {
        if(x.match(numFormat) && x.length == 9) {
            status = check9Num(x);
            if(status == 0) {
                var checkExist = await ajax.checkTZ(x); //check if the employee exist
                if (checkExist.length != 0) {
                    employee = checkExist[0];
                    status = 31;
                }
            }
        } else {
            status = 6;
        }
    }
    return status;
}

// return exist employee
function existEmployee() {
    return employee;
}

//check ספרת ביקורת
function check9Num(tz) {
    var status = 0;
    var number = tz;
    var arrayTz = [];
    var total = 0;
    var num9 = 0;
    var checkNum = 0;

    num9 = number % 10;
    number = Math.trunc(number / 10);
    for (let i = 0; i < 8; i++) {
        var a = number % 10;
        number = Math.trunc(number / 10);
        arrayTz.push(a);
    }
    arrayTz.forEach(function(num, i) {
        if (i % 2 == 0) {
            num = num * 2;

            if (num >= 10) {
                var numUnit = num % 10;
                var numDex = Math.trunc(num / 10);
                num = numUnit + numDex;
            }
            total += num;
        } else {
            total += num;
        }
    });
    var numUnitTotal = total % 10;
    if (numUnitTotal != 0) {
        checkNum = 10 - numUnitTotal;
    }
    if(checkNum != num9) {
        status = 7;
    }
    return status;
}

//check values
function confirmTel(x) {
    var status = 0;
    var numFormat = /^\d+$/;
    if(x == 0) {
        status = 1;
    } else {
        if(x.match(numFormat) && x.length > 8){
            status = 0;
        } else {
            status = 5;
        }
    }
    return status;
}

//check values
function confirmEmail(x) {
    var status = 0;
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(x == 0) {
        status = 1;
    } else {
        if (x.match(mailFormat)) {
            status = 0;
        } else {
            status = 4;
        }
    }
    return status;
}

//confirm add or update succes
function confirm(setting) {
    var status = 0;
    var x = setting.status;
    var y = setting.affectedRows;
    if(x == "OK" && y == "1") {
        status = 1;
    }
    return status;
}

async function updateUser(theForm) {
    var formData = new FormData(theForm);
    var arr = [];
    for (let input of formData.entries()) {
        arr.push(input[1]);
    }
    setting = await ajax.updateUser(arr, user[0].id);
    status = confirm(setting);
    return status;
}


export {
    checkToken,
    click,
    compose,
    timeout,
    checkLength,
    checkLogin,
    checkRole,
    logout,
    checkValsCreate,
    existEmployee,
    checkValsUpdate,
    createUser,
    updateUser
};