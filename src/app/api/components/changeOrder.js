// @ts-nocheck
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default async function changeOrder(components) {
  return fetch(`${import.meta.env.VITE_API_URL}/components/order`, {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${Cookies.get("jwt")}`,
    },
    body: JSON.stringify({
      components,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    });
}
