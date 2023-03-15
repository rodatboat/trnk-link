import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default async function fetchComponent() {
  return fetch(`${import.meta.env.VITE_API_URL}/components/`, {
    method: "GET",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${Cookies.get("jwt")}`

    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // toast.success(data.message);
        return data.data;
      } else {
        toast.error(data.message);
      }
    });
}
