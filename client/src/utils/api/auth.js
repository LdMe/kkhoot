import fetchData from "./fetch.js";

async function login(email, password){
    const data = {
        email,
        password
    }
    const result = await fetchData("/login","POST",data);
    return result;
}
async function logout(){
    const result = await fetchData("/logout","POST");
}
async function register(email,password){
    const data = {
        email,
        password
    }
    const result = await fetchData("/register","POST",data);
    return result;
}
async function getUserInfo(){
    const result = await fetchData("/user-info");
    return result;
}
export {
    login,
    logout,
    register,
    getUserInfo
}