import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useRegister } from "../fetch/login";
const Signup = () => {
  const [registerResponse, setRegisterResponse] = useState();

  const { mutate: registerFn } = useRegister({
    onSuccess: (resp) => {
      setRegisterResponse(resp.data);
    },
  });

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  const mobile = event.target.mobile.value;
                  const password = event.target.password.value;
                  const name = event.target.name.value;
                  const address = event.target.address.value;
                  registerFn({ mobile, password, name, address });
                }}
                action=""
                className="d-flex flex-column gap-15"
              >
                <CustomInput type="number" name="mobile" placeholder="Mobile" />
                <CustomInput
                  type="text"
                  name="name"
                  placeholder="Restaurant Name"
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <CustomInput type="text" name="address" placeholder="Address" />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
                  </div>
                </div>
              </form>
              <h3>{registerResponse}</h3>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
