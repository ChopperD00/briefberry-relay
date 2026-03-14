import { useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Feature from "./Feature";
import UpgradeToPremium from "./UpgradeToPremium";
import BackToFree from "./BackToFree";

import { pricing } from "./pricing";

type PricingProps = {
    className?: string;
    title: string;
    hideCircleButton?: boolean;
};

const Pricing = ({ className, title, hideCircleButton }: PricingProps) => {
    const [isModalPremiumOpen, setIsModalPremiumOpen] = useState(false);
    const [isModalFreeOpen, setIsModalFreeOpen] = useState(false);

    return (
        <>
            <div className={className || ""}>
                <div className="center">
                    <div className="max-w-130 mx-auto mb-16 text-center text-h1 max-lg:mb-12 max-md:max-w-full max-md:mb-8 max-md:text-left">
                        {title}
                    </div>
                    <div className="flex max-w-3xl mx-auto max-md:block">
                        {pricing.map((item, index) => (
                            <div
                                className="
                                    group flex flex-col w-1/2 p-2
                                    max-md:w-full max-md:min-h-126 max-md:first:rounded-5xl max-md:first:shadow-[inset_0px_0px_0px_1.5px_var(--color-stroke2)] max-md:not-last:mb-6
                                    nth-2:relative nth-2:before:absolute nth-2:before:inset-0 nth-2:before:rounded-5xl nth-2:before:border-[1.5px] nth-2:before:border-b-subtle nth-2:before:-b-from-40% nth-2:before:-b-to-100%
                                "
                                key={index}
                            >
                                <div
                                    className="
                                        relative z-2 flex flex-col grow p-2 rounded-4xl overflow-hidden
                                        group-nth-2:bg-b-surface2
                                    "
                                >
                                    <div className="relative z-2 pt-13 px-10 pb-8 max-lg:px-6 max-md:pt-6 max-md:pr-4 max-md:pl-6">
                                        {item.title === "Premium" &&
                                            !hideCircleButton && (
                                                <Button
                                                    className="absolute top-2 right-2 [&_svg]:-rotate-45"
                                                    isCircle
                                                    isStroke
                                                    onClick={() =>
                                                        setIsModalPremiumOpen(
                                                            true
                                                        )
                                                    }
                                                >
                                                    <Icon name="arrow" />
                                                </Button>
                                            )}
                                        <div className="mb-8 text-h3">
                                            {item.title}
                                        </div>
                                        <ul className="flex flex-col gap-3">
                                            {item.features.map(
                                                (feature, index) => (
                                                    <Feature
                                                        item={feature}
                                                        key={index}
                                                    />
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div
                                        className="
                                            relative z-2 mt-auto px-10 py-6 rounded-3xl max-lg:p-6
                                            group-first:shadow-[inset_0px_0px_0px_1.5px_var(--color-stroke-subtle)]
                                            group-nth-2:bg-b-surface2 group-nth-2:shadow-[inset_0px_0px_0px_1.5px_var(--color-stroke2)]
                                        "
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="text-h2 mr-3">
                                                ${item.price}
                                            </div>
                                            <div className="text-body-lg-bold text-t-secondary/80">
                                                /&nbsp;&nbsp;month
                                            </div>
                                        </div>
                                        {item.title === "Premium" ? (
                                            <Button
                                                isSecondary
                                                onClick={() =>
                                                    setIsModalPremiumOpen(true)
                                                }
                                            >
                                                Get started now
                                            </Button>
                                        ) : (
                                            <Button
                                                isPrimary
                                                onClick={() =>
                                                    setIsModalFreeOpen(true)
                                                }
                                            >
                                                Create an account
                                            </Button>
                                        )}
                                    </div>
                                    {item.title === "Premium" && (
                                        <div className="absolute right-0 bottom-0 max-md:-right-4 max-md:-bottom-4">
                                            <Image
                                                src="/images/pricing-gradient.png"
                                                width={351}
                                                height={291}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                open={isModalFreeOpen}
                onClose={() => setIsModalFreeOpen(false)}
            >
                <BackToFree />
            </Modal>
            <Modal
                open={isModalPremiumOpen}
                onClose={() => setIsModalPremiumOpen(false)}
            >
                <UpgradeToPremium />
            </Modal>
        </>
    );
};

export default Pricing;
