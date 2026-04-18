import type { ReactElement } from "react";
import SignInPage from "@/components/auth";
import LoginLayout from "@/core/layout/loginLayout";

const SignIn = () => {
  return <SignInPage />;
};

SignIn.getLayout = function (page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SignIn;