import Button from "@/components/Button";
import Feature from "../Feature";

import { pricing } from "../pricing";

const BackToFree = ({}) => {
    const premium = pricing.find((item) => item.title === "Premium");

    return (
        <>
            <div className="mb-3 text-h3">Back to free plan</div>
            <div className="mb-6 text-body text-t-secondary">
                On Nov 14, 2024, you will be downgraded to our Free plan and
                will lose access to
            </div>
            <ul className="flex flex-col gap-3 mb-6">
                {premium?.features.slice(1).map((feature, index) => (
                    <Feature item={feature} key={index} cancel />
                ))}
            </ul>
            <div className="mb-10 text-body text-t-secondary">
                Are you sure you&apos;d like to continue with the cancelation of
                your subscription?
            </div>
            <Button className="w-full" isSecondary>
                Yes, cancel my premium plan
            </Button>
        </>
    );
};

export default BackToFree;
