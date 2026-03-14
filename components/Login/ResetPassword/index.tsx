import { useState } from "react";
import Button from "@/components/Button";
import Field from "@/components/Field";

type Props = {
    onLogin: () => void;
    onResetPassword: () => void;
};

const ResetPassword = ({ onLogin, onResetPassword }: Props) => {
    const [email, setEmail] = useState("");

    return (
        <div className="">
            <div className="mb-10 text-center text-h3">Reset password</div>
            <Field
                className="mb-6"
                label="Email"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button
                className="w-full mb-4"
                isSecondary
                onClick={onResetPassword}
            >
                Reset password
            </Button>
            <div className="text-center text-hairline font-medium text-t-secondary">
                Have your password?{" "}
                <span
                    className="border-b border-t-primary text-t-primary cursor-pointer transition-colors hover:border-transparent"
                    onClick={onLogin}
                >
                    Login
                </span>
            </div>
        </div>
    );
};

export default ResetPassword;
