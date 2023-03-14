import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default async function loginUser({ username, password }) {
  return await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
    method: "POST",
    // crossDomain: true,
    credentials: 'same-origin',
    
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        Cookies.set("jwt", data.token)
        toast.success(data.message);
        window.location.href = "/tools";
    
      } else {
        toast.error(data.message);
      }
    });
}
