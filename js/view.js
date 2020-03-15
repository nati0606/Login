import * as views from "./modules/views.js";


//color numPad
function changeColor(x, color) {
    x.style.backgroundColor = color;
}

//reset color numPad in timeout
function timeout(x, color) {
    for (let i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = color;
    }
}

//error connect user code
function alertError(div) {
    var song = "error";
    var status = `<i class="fas fa-times co-red"></i>ERROR !`;
    var message = "WRONG CREDENTIALS !";
    views.alert(div, status, song, message);
}

function police(div) {
    div.innerHTML = views.police();
}

//enter client page
function homePageClient(div, infos) {
    div.innerHTML = views.client(infos);
}

//enter admin page
function homePageAdmin(div, infos) {
    div.innerHTML = views.admin(infos);
}

function existEmployee(div, employee) {
    var role = "";
    if(employee.role_id == 1) {
        role = "Admin";
    } else if(employee.role_id == 2) {
        role = "Manager";
    } else {
        role = "Client";
    }
    views.showEmployee(div, employee, role);
}

//show employee axist details
function showDetails(btn, details) {
    if (details.style.display == "block") {
        details.style.display = "none";
        btn.innerHTML = "SHOW EMPLOYEE DETAILS";
    } else {
        details.style.display = "block";
        btn.innerHTML = "HIDE EMPLOYEE DETAILS";
    }
}

//show values errors
function checkVals(vals, allStatus, divError) {
    resetVal(vals, divError);
    vals.forEach(function(val, i) {
        switch (allStatus[i + 1]) {
            case 1:
                val.classList.add("error");
                divError[i].innerHTML = "This field cannot be empty <br>";
                break;
            case 2:
                val.classList.add("error");
                divError[i].innerHTML = "Password must contain 4 digits <br>";
                break;
            case 3:
                val.classList.add("error");
                divError[i].innerHTML = "Please choose a role <br>";
                break;
            case 4:
                val.classList.add("error");
                divError[i].innerHTML = "Invalid email <br>";
                break;
            case 5:
                val.classList.add("error");
                divError[i].innerHTML = "Invalid phone. The number must contain at least 9 digits <br>";
                break;
            case 6:
                val.classList.add("error");
                divError[i].innerHTML = "Number must contain 9 digits <br>";
                break;
            case 7:
                val.classList.add("error");
                divError[i].innerHTML = "Invalid teudat zehut <br>";
                break;
        }
    });
}

//remove error
function resetVal(vals, divError) {
    vals.forEach(function(val, i){
        val.classList.remove("error");
        divError[i].innerHTML = "";
    });
}

function createPad(pad, status) {
    pad.innerHTML = views.createPad();
}

//create employee succes
function statusOkCreate(div, vals, role, divError) {
    resetVal(vals, divError);
    vals.forEach(function(val){
        val.value = "";
    });
    role.value = "0";
    var song = "true";
    var message = "The new Employee added in succes";
    var status = `<i class="fas fa-check co-green"></i>OK`;
    views.alert(div, status, song, message);
}

//update employee succes
function statusOkUpdate(div, vals, divError) {
    resetVal(vals, divError);
    vals[2].value = "";
    var song = "true";
    var message = "Update in succes";
    var status = `<i class="fas fa-check co-green"></i>OK`;
    views.alert(div, status, song, message);
}

//create/update employee not succes
function statusKo(div, vals, divError) {
    resetVal(vals, divError);
    vals[2].value = "";
    var song = "wrong";
    var message = "The new update failed";
    var status = `<i class="fas fa-times co-red"></i>ERROR !`;
    views.alert(div, status, song, message);
}

function playSong(song) {
    song.load();
    song.play();
}

//remove alert
function delAlert(btn) {
    btn.parentElement.remove();
}



export {
    createPad,
    alertError,
    changeColor,
    timeout,
    homePageClient,
    homePageAdmin,
    existEmployee,
    showDetails,
    checkVals,
    resetVal,
    police,
    statusOkCreate,
    statusOkUpdate,
    statusKo,
    playSong,
    delAlert
};