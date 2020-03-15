function divUpdate(table) {
var divUpdate = 
    `<h2>Set My Password</h2>

        <form id="update">
            <input type="number" class="input_val_update" name="tel" placeholder="Phone" value="${table[0].tel}">
            <span class="co-red">*</span> <br />
            <span class="comment_error_update"></span> <br />
            <input type="email" class="input_val_update" name="email" placeholder="Email" value="${table[0].email}">
            <span class="co-red">*</span> <br />
            <span class="comment_error_update"></span> <br />
            <input type="password" class="input_val_update" name="newPassword" placeholder="old/new password">
            <span class="co-red">*</span> <br />
            <span class="comment_error_update"></span> <br />

            <input type="submit" name="submit" value="UPDATE">
        </form>`;
    return divUpdate;
}


function client(table) {
    var pageClient = 
    `<header>
        <div class="container">
            <audio id="myAudio" src="./songs/true.mp3"></audio>
            <h1 class="floatL">Welcome, ${table[0].fName}</h1>

            <div id="btn_logout" class="floatR">
                <a href="#">Logout</a>
            </div>
            <div class="clear"></div>
        </div>

    </header>

    <section class="bac_col_user">    
        <div class="container">
            <div class="userUpdate">
            ${divUpdate(table)}
            </div>
        </div>
    </section>`;
    return pageClient;
}

function admin(table) {
    var pageAdmin = 
    `<header>
        <div class="container">
            <audio id="myAudio" src="./songs/true.mp3" ></audio>
            <h1 class="floatL">I'm the Boss!</h1>

            <div id="btn_logout" class="floatR">
                <a href="#">Logout</a>
            </div>
            <div class="clear"></div>
        </div>

    </header>

    <section class="bac_col_user">    
        <div class="container pageAdmin">

            <div class="userUpdate floatL">
                ${divUpdate(table)}
            </div>

            <div class="adminUpdate floatR">

                <h2>Add an Employee</h2>

                <form id="createEmployee" method="post" enctype="text/plain">
                    <input type="text" class="input_val" name="fName" id="fName" placeholder="First Name">
                    <span class="co-red">*</span> <br />
                    <span class="comment_error"></span> <br />
                    <input type="text" class="input_val" name="lName" id="lName" placeholder="Last Name">
                    <span class="co-red">*</span> <br />
                    <span class="comment_error"></span> <br />
                    <input type="number" class="input_val" name="tz" id="tz" placeholder="Teudat zehut">
                    <span class="co-red">*</span> <br />
                    <span class="comment_error"></span> <br />
                    <input type="number" class="input_val" name="tel" id="tel" placeholder="Phone">
                    <span class="co-red">*</span> <br />
                    <span class="comment_error"></span> <br />
                    <input type="email" class="input_val" name="email" id="email" placeholder="Email">
                    <span class="co-red">*</span> <br />
                    <span class="comment_error"></span> <br />
                    <input type="password" class="input_val" name="password" id="password" placeholder="Password">
                    <span class="co-red">*</span> <br />
                    <span class="comment_error"></span> <br />
                    
                    <select name="role" id="role" class="input_val">
                        <option value="0">Select Role</option>
                        <option value="2">Manager</option>
                        <option value="3">Client</option>
                    </select>
                    <span class="co-red">*</span> <br />
                    <span class="comment_error"></span> <br />
                    
                    <input type="submit" name="submit" value="ADD AN EMPLOYEE">
                </form>
            
            </div>
            <div class="clear"></div>
            
        </div>
    </section>`;
    return pageAdmin;
}

function showEmployee(mainDiv, infos, role) {
    var newDiv = document.createElement("div");
    newDiv.id = "alert_exist";
    newDiv.innerHTML =
        `<a href="#" id="btn_remove" class="remove">
            <i class="fas fa-times"></i>
        </a>
        <div id="mess_exist" class="ta-c">
            <audio id="myAudio" src="./songs/wrong.mp3" ></audio>
            <h3 class="fs25">The employee already exist !</h3>
            <button id="show_details">SHOW EMPLOYEE DETAILS</button>
        </div>

        <div id="exist_employee">
            <div>
                <p class="floatL ta-r wid30">id: </p>
                <p class="floatR ta-l wid70">${infos.id}</p>
                <div class="clear"></div>
            </div>
            <div>
                <p class="floatL ta-r wid30">Last name: </p>
                <p class="floatR ta-l wid70">${infos.lName}</p>
                <div class="clear"></div>
            </div>
            <div>
                <p class="floatL ta-r wid30">First name: </p>
                <p class="floatR ta-l wid70">${infos.fName}</p>
                <div class="clear"></div>
            </div>
            <div>
                <p class="floatL ta-r wid30">Teudat zehut: </p>
                <p class="floatR ta-l wid70">${infos.tz}</p>
                <div class="clear"></div>
            </div>
            <div>
                <p class="floatL ta-r wid30">Email: </p>
                <p class="floatR ta-l wid70">${infos.email}</p>
                <div class="clear"></div>
            </div>
            <div>
                <p class="floatL ta-r wid30">Tel: </p>
                <p class="floatR ta-l wid70">${infos.tel}</p>
                <div class="clear"></div>
            </div>
            <div>
                <p class="floatL ta-r wid30">Create to: </p>
                <p class="floatR ta-l wid70">${infos.createDate}</p>
                <div class="clear"></div>
            </div>
            <div>
                <p class="floatL ta-r wid30">Role: </p>
                <p class="floatR ta-l wid70">${role}</p>
                <div class="clear"></div>
            </div>
        </div>`;
    mainDiv.prepend(newDiv);
}

function createPad() {
    var pad =
    `<div class="marT100">
        <audio id="myAudio" src="./songs/click.mp3" ></audio>
        <button id="1" class="num">1</button>
        <button id="2" class="num">2</button>
        <button id="3" class="num">3</button>
        <button id="4" class="num">4</button>
        <button id="5" class="num">5</button>
        <button id="6" class="num">6</button>
        <button id="7" class="num">7</button>
        <button id="8" class="num">8</button>
        <button id="9" class="num">9</button>
        <button id="0" class="num width100">0</button>
    </div>`;
    return pad;
}

function alert(mainDiv, status, track, message) {
    var newDiv = document.createElement("div");
    newDiv.id = "alert";
    newDiv.classList = "ta-c";
    newDiv.innerHTML =
    `<h3>
        ${status}
    </h3>
    <a href="#" id="btn_remove" class="remove">
        <i class="fas fa-times"></i>
    </a>

    <div>
        <audio id="myAudio" src="./songs/${track}.mp3" ></audio>
        ${message}
    </div>`;
    mainDiv.prepend(newDiv);
}

function police() {
    var police =
    `<audio id="myAudio" src="./songs/police.mp3" ></audio>
    <div class="police">
        THE POLICE IS COMMING !!
    </div>`;
    return police;
}

export { 
    client,
    admin,
    showEmployee,
    createPad,
    alert,
    police
};