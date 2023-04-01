import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default async function updateUser({
  background
}) {
  return fetch(`${import.meta.env.VITE_API_URL}/user/update`, {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${Cookies.get("jwt")}`,
    },
    body: JSON.stringify({
      background
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        toast.success(data.message);
        return data.data;
      } else {
        toast.error(data.message);
      }
    });
}
