import * as model from "./model.js";
import * as view from "./view.js";


var main = "";
var pad = "";
var i = 0;
var colorTime = "";
var color = "";
var length = false;
var check = 0;


export async function init() {
    main = document.querySelector("#main");
    check = await model.checkToken();
    if(check == 0) {
        view.createPad(main, check);
        pad = document.getElementsByClassName("num");
        click();
    } else {
        checkRole();
    }
}


function click() {
    for (i = 0; i < pad.length; i++) {
        color = model.click();
        view.changeColor(pad[i], color);
        pad[i].addEventListener("click", compose);
    }
}


function compose() {
    clearTimeout(colorTime);
    color = model.compose(this);
    playSong();
    view.changeColor(this, color);
    colorTime = setTimeout(function() {
        color = model.timeout();
        view.timeout(pad, color);
    }, 3000);
    checkLength();
}

function checkLength() {
    length = model.checkLength();
    if (length) {
        checkLogin();
    }
}

async function checkLogin() {
    check = await model.checkLogin();
    console.log(check);
    if (check == 0) {
        view.alertError(main);
        playSong();
        delAlert();
        click();
    } else if (check == 100) {
        view.police(main);
        playSong();
    } else {
        checkRole();
    }
}

function checkRole() {
    var roleId = model.checkRole();
        if(roleId == 1) {
            admin();
        } else {
            client();
        }
}

function admin() {
    view.homePageAdmin(main, check);
    adminAndClient();
    listenerCreate();
}

function client() {
    view.homePageClient(main, check);
    adminAndClient();
}

function adminAndClient() {
    playSong();
    logout();
    listenerUpdate();
}

function listenerCreate() {
    var theFormCreate = document.getElementById("createEmployee");
    theFormCreate.addEventListener("submit", function(e) {
        e.preventDefault();
        checkVals(theFormCreate);
    });
}

function listenerUpdate() {
    var theFormUpdate = document.getElementById("update");
    theFormUpdate.addEventListener("submit", function(e) {
        e.preventDefault();
        checkValsUpdate(theFormUpdate);
    });
}

async function checkVals(theFormCreate) {
    var input_val = document.querySelectorAll(".input_val");
    var role_val = document.getElementById("role");
    var comments = document.querySelectorAll(".comment_error");
    var checkVals = await model.checkValsCreate(input_val, role_val);
    checkValsAction(theFormCreate, input_val, role_val, comments, checkVals);
}

function checkValsAction(theFormCreate, input_val, role_val, comments, checkVals) {
    if(checkVals[0] > 30) {
        var existEmployee = model.existEmployee();
        view.existEmployee(main, existEmployee);
        playSong();
        delAlert();
        showEmployeeDetails();
    } else if(checkVals[0] != 0) {
        view.checkVals(input_val, checkVals, comments);
    } else {
        createUser(theFormCreate, input_val, role_val, comments);
    }
}

function logout() {
    var btnLogout = document.getElementById("btn_logout");
    btnLogout.addEventListener("click", function(e) {
        e.preventDefault();
        model.logout();
        view.createPad(main);
        init();
    });
}

async function createUser(theForm, input_val, role_val, comments) {
    var confirmation = 0;
    confirmation = await model.createUser(theForm);
    if(confirmation == 1) {
        view.statusOkCreate(main, input_val, role_val, comments);
    } else {
        view.statusKo(main, input_val, comments);
    }
    playSong();
    delAlert();
}

function checkValsUpdate(theForm) {
    var input_val = document.querySelectorAll(".input_val_update");
    var comments = document.querySelectorAll(".comment_error_update");
    var checkVals = model.checkValsUpdate(input_val);
    if(checkVals[0] != 0) {
        view.checkVals(input_val, checkVals, comments);
    } else {
        updateUser(theForm, input_val, comments);
    }
}

async function updateUser(theForm, input_val, comments){
    var confirmation = 0;
    confirmation = await model.updateUser(theForm);
    if(confirmation == 1) {
        view.statusOkUpdate(main, input_val, comments);
    } else {
        view.statusKo(main, input_val, comments);
    }
    playSong();
    delAlert();
}

function playSong() {
    var song = document.getElementById("myAudio");
    view.playSong(song);
}

function delAlert() {
    var btnRemove = document.getElementById("btn_remove");
    btnRemove.addEventListener("click", function(e) {
        e.preventDefault();
        view.delAlert(btnRemove);
    });
}

function showEmployeeDetails() {
    var details = document.getElementById('exist_employee');
    var btnShowDetails = document.getElementById("show_details");
    btnShowDetails.addEventListener("click", function() {
        view.showDetails(btnShowDetails, details);
    });
}