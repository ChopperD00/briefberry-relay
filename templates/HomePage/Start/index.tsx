import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";
import Button from "@/components/Button";
import Image from "@/components/Image";

const Start = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();
    const isTablet = useMediaQuery("(max-width: 1023px)");
    const isMobile = useMediaQuery("(max-width: 767px)");

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 50);
    }, []);

    return (
        <div className="section section-lines before:-top-38! before:-bottom-21! after:-top-38! after:-bottom-21! max-lg:before:-top-23.5! max-lg:before:-bottom-4! max-lg:after:-top-23.5! max-lg:after:-bottom-4! max-md:before:hidden max-md:after:hidden">
            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="relative p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 w-253 h-253 -translate-x-1/2 -translate-y-1/2 max-lg:w-222 max-lg:h-222 max-md:top-65 max-md:translate-y-0">
                            <Image
                                className="object-contain"
                                src="/images/start-gradient.png"
                                fill
                                alt=""
                                sizes="(max-width: 1023px) 100vw, 50vw"
                                priority
                            />
                        </div>
                        <div className="relative z-2 pt-20 px-18 bg-b-subtle95 rounded-4xl overflow-hidden max-lg:pt-12 max-lg:px-8 max-md:pt-8 max-md:px-6">
                            <div className="mb-18 text-center max-lg:max-w-96 max-lg:mx-auto max-lg:mb-10 max-md:max-w-full max-md:text-left max-md:mb-12">
                                <div className="mb-5 text-h1">
                                    Start crafting brilliant briefs today
                                </div>
                                <div className="mb-8 text-body-lg text-t-secondary max-md:mb-6">
                                    Join thousands of designers and elevate your
                                    project workflow for free
                                </div>
                                <Button isSecondary as="link" href="/quiz">
                                    Get started for free
                                </Button>
                            </div>
                            <div className="relative max-w-155 mx-auto rounded-t-3xl shadow-hover before:absolute before:top-10.5 before:-left-23 before:right-13 before:-bottom-29.5 before:rounded-2xl before:bg-b-box-shadow before:blur-2xl max-lg:max-w-139 max-lg:before:left-20 max-lg:before:-right-35 max-md:px-1 max-md:before:left-25 dark:before:-left-5 dark:before:-right-5">
                                <div className="absolute top-10 -right-16 -left-16 -bottom-8 rounded-t-xl bg-b-surface2 opacity-50 max-lg:-left-6 max-lg:-right-6 max-md:top-4 max-md:-left-3 max-md:-right-3 dark:before:absolute dark:before:inset-0 dark:before:rounded-t-2xl dark:before:border-[1.5px] dark:before:border-[#FDFDFD]/5 dark:before:mask-b-from-40% dark:before:mask-b-to-100%"></div>
                                {isMounted && (
                                    <Image
                                        className="relative z-2 w-full h-auto rounded-t-2xl"
                                        src={
                                            theme === "dark"
                                                ? isMobile
                                                    ? "/images/start-pic-dark-mobile-1.png"
                                                    : isTablet
                                                    ? "/images/start-pic-dark-tablet-1.png"
                                                    : "/images/start-pic-dark-1.png"
                                                : isMobile
                                                ? "/images/start-pic-light-mobile-1.png"
                                                : isTablet
                                                ? "/images/start-pic-light-tablet-1.png"
                                                : "/images/start-pic-light-1.png"
                                        }
                                        width={
                                            isMobile
                                                ? 255
                                                : isTablet
                                                ? 556
                                                : 620
                                        }
                                        height={
                                            isMobile
                                                ? 293
                                                : isTablet
                                                ? 328
                                                : 328
                                        }
                                        alt=""
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Start;
