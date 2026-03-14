import { useState } from "react";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Field from "@/components/Field";

type Props = {
    onSignIn: () => void;
    onCreateAccount: () => void;
};

const CreateAccount = ({ onSignIn, onCreateAccount }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="">
            <div className="mb-10 text-center text-h3">Create an account</div>
            <Button className="w-full" isPrimary onClick={onCreateAccount}>
                <Image
                    className="w-6 mr-2 opacity-100"
                    src="/images/google.svg"
                    width={24}
                    height={24}
                    alt="Google"
                />
                Sign up with Google
            </Button>
            <div className="py-6 text-center text-small font-medium text-t-tertiary">
                Or use your email
            </div>
            <Field
                className="mb-4"
                label="Email"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Field
                className="mb-6"
                label="Password"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button
                className="w-full mb-4"
                isSecondary
                onClick={onCreateAccount}
            >
                Create account
            </Button>
            <div className="text-center text-hairline font-medium text-t-secondary">
                Already have an account?{" "}
                <span
                    className="border-b border-t-primary text-t-primary cursor-pointer transition-colors hover:border-transparent"
                    onClick={onSignIn}
                >
                    Sign in
                </span>
            </div>
        </div>
    );
};

export default CreateAccount;
