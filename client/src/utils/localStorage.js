
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key, defaultValue = null,parse=true) {
    const result = localStorage.getItem(key);
    if (result && parse) {
        return JSON.parse(result);
    } else {
        return defaultValue;
    }
}

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
}

function saveToken(token) {
    saveToLocalStorage("token", token);
}

function getToken(){
    try{

        return getFromLocalStorage("token",null);
    }catch(e){
        return null;
    }
}
function saveUsername(username) {
    saveToLocalStorage("username", username);
}

function getUsername(){
    return getFromLocalStorage("username",null,false);
}
function removeUsername(){
    removeFromLocalStorage("username");
}

function removeToken(){
    removeFromLocalStorage("token");
}

export {
    saveToken,
    getToken,
    removeToken,
    saveUsername,
    getUsername,
    removeUsername
}