import type { ReactElement } from "react";
import LoginLayout from "@/core/layout/loginLayout";
import SignupPage from "@/components/auth/signup";

const SignUp = () => {
  return <SignupPage />;
};

SignUp.getLayout = function (page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SignUp;
