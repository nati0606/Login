async function checkToken(token) {
    var settings = {
        "url": "https://pollux-9487ad.appdrag.site/api/Client/checkToken",
        "data": {
            "token" : token,
            "AD_PageNbr" : "1",
            "AD_PageSize" : "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    var result = null;
    await $.ajax(settings).done(function (response) {
        result = response.Table;
    });
    return result;
}

async function changeToken(user, token) {
    var settings = {
        "url": "https://pollux-9487ad.appdrag.site/api/Client/changeToken",
        "data": {
            "id" : user.id,
            "token" : token
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    var result = null;
    await $.ajax(settings).done(function (response) {
        result = response;
    });
    return result;
}

async function checkPassword(numKlead) {
    var settings = {
        "url": "https://pollux-9487ad.appdrag.site/api/Client/loginByPassword",
        "data": {
            "password" : numKlead,
            "AD_PageNbr" : "1",
            "AD_PageSize" : "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    var result = null;
    await $.ajax(settings).done(function (response) {
        result = response.Table;
    });
    return result;
}

async function createUser(arr){
        var settings = {
            "url": "https://pollux-9487ad.appdrag.site/api/Client/register",
            "data": {
                "fName" : arr[0],
                "lName" : arr[1],
                "tz" : arr[2],
                "tel" : arr[3],
                "email" : arr[4],
                "password" : arr[5],
                "role_id" : arr[6],
                "token" : arr[7]
            },
            "method": "POST",
            "async": true,
            "crossDomain": true,
            "processData": true
        };
        var result = null;
        await $.ajax(settings).done(function (response) {
            result = response;
        });
    return result;
}

async function updateUser(arr, userId) {
    var settings = {
        "url": "https://pollux-9487ad.appdrag.site/api/Client/UpdatePassword",
        "data": {
            "id" : userId,
            "tel" : arr[0],
            "email" : arr[1],
            "password" : arr[2]
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    var result = null;
    await $.ajax(settings).done(function (response) {
        result = response;
    });
    return result;
}

// check if the number exists
async function checkTZ(tz) {
    var settings = {
        "url": "https://pollux-9487ad.appdrag.site/api/Client/checkTZ",
        "data": {
            "tz" : tz,
            "AD_PageNbr" : "1",
            "AD_PageSize" : "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    var result = null;
    await $.ajax(settings).done(function (response) {
        result = response.Table;
    });
    return result;
}


export {
    checkToken,
    changeToken,
    checkPassword,
    createUser,
    updateUser,
    checkTZ
};