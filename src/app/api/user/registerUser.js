import { toast } from "react-hot-toast";

export default async function registerUser({ email, username, password }) {
  return fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        toast.success(data.message);
        window.location.href = "/login";
      } else {
        toast.error(data.message);
      }
    });
}
