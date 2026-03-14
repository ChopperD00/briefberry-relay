import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";
import Image from "@/components/Image";
import Button from "@/components/Button";

const Hero = () => {
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
        <div className="section section-lines pt-20 text-center max-md:pt-10 max-md:text-left before:-top-22! after:-top-22! max-lg:before:top-0! max-lg:after:top-0! max-md:before:bottom-4! max-md:after:bottom-4!">
            <div className="relative mb-12 before:absolute before:-top-6 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) max-lg:before:-top-11 max-md:before:-top-4 after:absolute after:-bottom-6 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-lg:after:-bottom-7 max-md:after:-bottom-4 max-md:mb-8">
                <div className="center max-w-200 max-lg:max-w-175 max-md:max-w-full">
                    <h1 className="mb-5 text-hero max-lg:max-w-132 max-lg:mx-auto max-lg:mb-5 max-md:max-w-full">
                        AI-powered project briefs for designers
                    </h1>
                    <div className="text-body-lg text-t-secondary">
                        Transform your ideas into comprehensive project briefs
                        in seconds! Let AI create your project brief while you
                        focus on bringing your vision to life.
                    </div>
                </div>
            </div>
            <Button
                className="mb-12 max-lg:mb-10 max-md:ml-6"
                isSecondary
                as="link"
                href="/quiz"
            >
                Get started for free
            </Button>
            <div className="relative mb-12 before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal)">
                <div className="center">
                    <div className="relative p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="absolute inset-2 rounded-4xl overflow-hidden bg-b-subtle">
                            <Image
                                className="object-cover"
                                src="/images/hero-gradient.png"
                                fill
                                alt=""
                                sizes="(max-width: 1023px) 100vw, 50vw"
                            />
                        </div>
                        <div className="relative z-2 h-132 overflow-hidden rounded-4xl max-md:h-auto max-md:pt-6 max-md:pl-6">
                            <div
                                className="
                                    absolute bottom-0 left-[calc(50%-25.5rem)] w-179 max-3xl:left-[calc(50%-25rem)] max-lg:left-1/2 max-lg:w-136 max-lg:-translate-x-1/2 max-md:relative max-md:w-auto max-md:left-auto max-md:bottom-auto max-md:translate-x-0
                                    before:absolute before:-top-5 before:left-4.5 before:right-3.5 before:bottom-0 before:rounded-2xl before:bg-b-surface2 before:opacity-50 max-lg:before:hidden
                                    after:absolute after:-top-2 after:left-6.75 after:right-6.75 after:bottom-13 after:rounded-2xl after:bg-b-box-shadow after:blur-2xl max-lg:after:top-2 max-lg:after:left-10.75 max-lg:after:-right-40.25 max-md:after:top-4 max-md:after:-left-4 max-md:after:right-6 max-md:after:-bottom-4 dark:after:opacity-0
                                "
                            >
                                {isMounted && (
                                    <Image
                                        className="relative z-2 w-full h-auto rounded-t-2xl opacity-100"
                                        src={
                                            theme === "dark"
                                                ? isMobile
                                                    ? "/images/hero-pic-dark-mobile-1.png"
                                                    : isTablet
                                                    ? "/images/hero-pic-dark-tablet-1.png"
                                                    : "/images/hero-pic-dark-1.png"
                                                : isMobile
                                                ? "/images/hero-pic-light-mobile-1.png"
                                                : isTablet
                                                ? "/images/hero-pic-light-tablet-1.png"
                                                : "/images/hero-pic-light-1.png"
                                        }
                                        width={
                                            isMobile
                                                ? 287
                                                : isTablet
                                                ? 544
                                                : 716
                                        }
                                        height={
                                            isMobile
                                                ? 371
                                                : isTablet
                                                ? 464
                                                : 448
                                        }
                                        alt=""
                                        quality={100}
                                        unoptimized
                                    />
                                )}
                            </div>
                            <div
                                className="
                                    absolute bottom-0 z-2 right-[calc(50%-25.5rem)] w-76 max-3xl:right-[calc(50%-26rem)] max-lg:right-0 max-lg:w-74 max-md:w-[42%]
                                    after:absolute after:-top-7.25 after:-left-10.75 after:right-10.75 after:-bottom-7.25 after:rounded-2xl after:bg-b-box-shadow after:blur-2xl max-lg:after:top-6 max-lg:after:-left-14.5 max-lg:after:right-12 max-lg:after:-bottom-31 max-md:after:top-4 max-md:after:-left-9 max-md:after:-right-3 max-md:after:-bottom-3 dark:after:opacity-30
                                "
                            >
                                {isMounted && (
                                    <Image
                                        className="relative z-2 w-full h-auto rounded-t-2xl opacity-100 max-md:rounded-tr-none"
                                        src={
                                            theme === "dark"
                                                ? isMobile
                                                    ? "/images/hero-pic-dark-mobile-2.png"
                                                    : "/images/hero-pic-dark-2.png"
                                                : isMobile
                                                ? "/images/hero-pic-light-mobile-2.png"
                                                : "/images/hero-pic-light-2.png"
                                        }
                                        width={isMobile ? 130 : 303}
                                        height={isMobile ? 263 : 316}
                                        alt=""
                                        quality={100}
                                        unoptimized
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 max-lg:mt-10">
                <div className="mb-3 text-heading-thin text-t-secondary max-md:text-center">
                    Join 80,000+ designers
                </div>
                <div className="flex items-center justify-center -mt-0.5">
                    <div className="flex">
                        {[
                            "/images/avatar-1.png",
                            "/images/avatar-2.png",
                            "/images/avatar-3.png",
                            "/images/avatar-4.png",
                            "/images/avatar-5.png",
                        ].map((src, index) => (
                            <div
                                className="relative border-2 border-b-surface1 rounded-full overflow-hidden not-first:-ml-3.25"
                                key={index}
                            >
                                <Image
                                    className="w-8 scale-105 opacity-100"
                                    src={src}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                    <div className="relative z-2 -ml-3.25 border-2 border-b-surface1 rounded-[1.125rem] bg-b-surface1">
                        <span className="flex items-center justify-center h-8 rounded-2xl px-2.5 bg-primary1/5 border-[1.5px] border-primary1/15 text-button text-t-blue">
                            1,234+
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
