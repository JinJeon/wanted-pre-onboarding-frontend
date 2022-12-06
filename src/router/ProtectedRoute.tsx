import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { checkIsLogin } from "@api/auth";
import Loading from "@components/Loading";
import { useAfterLogin } from "@constants/sentences";
import { pathName } from "@router";

const ProtectedRoute = () => {
  const [contents, setContents] = useState(<Loading color='yellow' border={5} size={40} />);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = checkIsLogin();
    if (isLogin) {
      setContents(<Outlet />);
    } else {
      navigate(pathName.signin, { state: useAfterLogin });
    }
  }, []);

  return contents;
};

export default ProtectedRoute;
