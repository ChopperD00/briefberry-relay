import { useState } from "react";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import ResetPassword from "./ResetPassword";

type Props = {
    onLogin: () => void;
};

const Login = ({ onLogin }: Props) => {
    const [step, setStep] = useState<
        "signIn" | "createAccount" | "resetPassword"
    >("signIn");

    return (
        <div className="">
            {step === "signIn" && (
                <SignIn
                    onResetPassword={() => setStep("resetPassword")}
                    onSignUp={() => setStep("createAccount")}
                    onLogin={onLogin}
                />
            )}
            {step === "createAccount" && (
                <CreateAccount
                    onSignIn={() => setStep("signIn")}
                    onCreateAccount={onLogin}
                />
            )}
            {step === "resetPassword" && (
                <ResetPassword
                    onLogin={() => setStep("signIn")}
                    onResetPassword={() => setStep("signIn")}
                />
            )}
        </div>
    );
};

export default Login;
