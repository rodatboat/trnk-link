export default async function logoutUser() {
    Cookies.remove("jwt");
    window.location.href = "./login";
}