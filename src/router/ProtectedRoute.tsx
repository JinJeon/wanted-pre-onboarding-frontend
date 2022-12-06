import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { checkIsLogin } from "@api/auth";
import Loading from "@components/Loading";
import { pathName } from "@router";

const ProtectedRoute = () => {
  const [contents, setContents] = useState(<Loading color='yellow' border={40} size={5} />);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = checkIsLogin();
    if (isLogin) {
      setContents(<Outlet />);
    } else {
      navigate(pathName.signin, { state: "로그인 후 이용하십시오" });
    }
  }, []);

  return contents;
};

export default ProtectedRoute;
