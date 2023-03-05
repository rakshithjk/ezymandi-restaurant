import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useRestPassword } from "../fetch/login";
const Forgotpassword = () => {
  const [loginResponse, setLoginResponse] = useState();

  const { mutate: resetFn } = useRestPassword({
    onSuccess: (resp) => {
      setLoginResponse(resp.data);
    },
  });

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will contact you to reset your password
              </p>
              <form
                action=""
                onSubmit={(event) => {
                  event.preventDefault();

                  const mobile = event.target.mobile.value;

                  resetFn({ mobile });
                }}
                className="d-flex flex-column gap-15"
              >
                <CustomInput type="number" name="number" placeholder="Mobile" />

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
              {loginResponse?.message.includes("Success") &&
                "Request received. We will contact you shortly. Please call us in case of urgency"}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
