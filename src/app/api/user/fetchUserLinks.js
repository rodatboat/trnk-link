import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";

export default async function fetchUserLinks(username) {
  return fetch(`${import.meta.env.VITE_API_URL}/user/${username}`, {
    method: "GET",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${Cookies.get("jwt")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // toast.success(data.message);
        return data;
      } else {
        // toast.error(data.message);
        return data;
      }
    });
}
