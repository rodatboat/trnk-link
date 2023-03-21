import Cookies from "js-cookie";

export default async function logoutUser() {
    Cookies.remove("jwt");
    window.localStorage.clear();
    window.location.href = "./login";
}