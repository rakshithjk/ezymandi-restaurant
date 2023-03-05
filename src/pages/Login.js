import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useLogin, useGetCurrentUser } from "../fetch/login";
import { API_TOKEN } from "../utils/constants";
import { getAccessToken } from "../utils/utils";

import { queryClient } from "../App";

const Login = () => {
  const [loginResponse, setLoginResponse] = useState();

  const { data } = useGetCurrentUser({});

  const { mutate: loginFn } = useLogin({
    onSuccess: (resp) => {
      setLoginResponse(resp.data);
      localStorage.setItem(API_TOKEN, resp.data.access_token);
    },
  });

  if (loginResponse?.message.includes("Success")) {
    return <Navigate to="/cart" />;
  }

  if (!!getAccessToken() && data && !("msg" in data)) {
    return (
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3 p-5">Account details</h3>
              <h3>Restaurant Name: {data[0].RestaurantName}</h3>
              <h5>Contact Number: {data[0].Phone}</h5>

              <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                <button
                  onClick={() => {
                    localStorage.removeItem(API_TOKEN);
                    queryClient.invalidateQueries({
                      queryKey: ["current", "user"],
                    });
                    window.location.reload();
                  }}
                  className="button border-0"
                  type="submit"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                action=""
                onSubmit={(event) => {
                  event.preventDefault();

                  const mobile = event.target.mobile.value;
                  const password = event.target.password.value;
                  loginFn({ mobile, password });
                }}
                className="d-flex flex-column gap-15"
              >
                <CustomInput type="mobile" name="mobile" placeholder="Mobile" />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
              <div className=" d-flex justify-content-center align-items-center p-5 text-danger">
                <span>{JSON.stringify(loginResponse?.message)}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
