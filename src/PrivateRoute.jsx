
import { Routes, Route, Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function PrivateRoute({children, or}) {
  const [loginStatus, setLoginStatus] = useState(Cookies.get("jwt"));
  

  return loginStatus ? children : (or ? or : <Navigate to="/login" />);
}

export default PrivateRoute;