import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

import { content } from "./content";

const About = ({}) => {
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
        <div className="section section-lines before:-top-9! before:-bottom-51! after:-top-9! after:-bottom-51! max-md:before:hidden max-md:after:hidden">
            <div className="mb-20 text-center max-lg:mb-12 max-md:mb-10 max-md:text-left">
                <div className="center">
                    <div className="mb-5 text-h1">
                        AI-powered briefs in seconds
                    </div>
                    <div className="text-body-lg text-t-secondary/80">
                        Save hours of preparation time with intelligent brief
                        generation
                    </div>
                </div>
            </div>
            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="flex flex-wrap -mt-4 -mx-2">
                            {content.map((item, index) => (
                                <div
                                    key={index}
                                    className="
                                        group relative w-[calc(50%-1rem)] mt-4 mx-2 p-12 rounded-4xl bg-b-subtle overflow-hidden max-lg:p-8 max-md:w-[calc(100%-1rem)]
                                        first:flex first:flex-row-reverse first:items-center first:w-[calc(100%-1rem)] first:h-90 max-lg:first:h-75 max-md:first:flex-col max-md:first:h-auto
                                    "
                                >
                                    <div
                                        className="
                                            relative z-2 max-md:-mr-8 max-md:mb-10
                                            group-first:absolute group-first:right-0 group-first:bottom-0 max-3xl:group-first:-right-16 max-lg:group-first:right-0 max-md:group-first:relative max-md:group-first:right-auto max-md:group-first:bottom-auto max-md:group-first:w-[calc(100%+2rem)]
                                            group-not-first:mb-12 max-3xl:group-not-first:-mr-12 max-lg:group-not-first:-mr-8 max-md:group-not-first:mb-10
                                        "
                                    >
                                        <div
                                            className="
                                                group-first:absolute group-first:top-20 group-first:-left-20 group-first:right-0 group-first:bottom-0 group-first:rounded-tl-2xl group-first:shadow-hover group-first:bg-b-surface1 dark:max-md:group-first:hidden
                                                max-lg:group-first:top-12 max-lg:group-first:-left-12 max-lg:group-first:bg-b-surface2
                                                max-md:group-first:top-0.5 max-md:group-first:-left-4 max-md:group-first:-bottom-10 max-md:group-first:w-87 max-md:group-first:bg-b-box-shadow max-md:group-first:blur-2xl max-md:group-first:rounded-2xl max-md:group-first:shadow-none
                                                group-not-first:absolute group-not-first:w-87 group-not-first:bg-b-box-shadow group-not-first:blur-2xl group-not-first:rounded-2xl dark:group-not-first:opacity-50 dark:max-md:group-not-first:hidden
                                                group-nth-2:top-4 group-nth-2:-left-4 group-nth-2:-bottom-8 max-lg:group-nth-2:-bottom-10 max-md:top-0.5
                                                group-nth-3:top-0.5 group-nth-3:-left-4 group-nth-3:-bottom-4 max-lg:group-nth-3:-bottom-13.5 max-md:group-nth-3:-bottom-10
                                            "
                                        ></div>
                                        <div
                                            className="
                                                group-first:absolute group-first:z-1 group-first:top-10 group-first:-left-10 group-first:right-0 group-first:bottom-0 group-first:rounded-tl-2xl group-first:shadow-hover group-first:bg-b-surface2
                                                max-lg:group-first:top-6 max-lg:group-first:-left-6
                                                max-md:hidden
                                                group-not-first:hidden
                                            "
                                        ></div>
                                        <div
                                            className="
                                                relative z-2
                                                group-first:before:absolute group-first:before:top-4.5 group-first:before:-left-4 group-first:before:-right-4 group-first:before:-bottom-14.5 group-first:before:bg-b-box-shadow group-first:before:blur-2xl group-first:before:rounded-2xl
                                                dark:group-first:before:opacity-50
                                            "
                                        >
                                            {isMounted && (
                                                <Image
                                                    className="
                                                        relative z-2 max-w-fit max-md:w-full max-md:h-auto
                                                        group-not-first:w-full group-not-first:rounded-2xl max-3xl:group-not-first:rounded-r-none
                                                    "
                                                    src={
                                                        theme === "light"
                                                            ? isMobile
                                                                ? item.imageLightMobile
                                                                : isTablet
                                                                ? item.imageLightTablet
                                                                : item.imageLight
                                                            : isMobile
                                                            ? item.imageDarkMobile
                                                            : isTablet
                                                            ? item.imageDarkTablet
                                                            : item.imageDark
                                                    }
                                                    width={
                                                        index === 0
                                                            ? isMobile
                                                                ? 279
                                                                : isTablet
                                                                ? 280
                                                                : 472
                                                            : isMobile
                                                            ? 279
                                                            : isTablet
                                                            ? 296
                                                            : 496
                                                    }
                                                    height={
                                                        index === 0
                                                            ? isMobile
                                                                ? 220
                                                                : isTablet
                                                                ? 270
                                                                : 306
                                                            : isMobile
                                                            ? 220
                                                            : isTablet
                                                            ? 220
                                                            : 244
                                                    }
                                                    alt=""
                                                    unoptimized
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative z-2 group-first:max-w-93.5 group-first:mr-auto">
                                        <div className="mb-6 fill-t-primary">
                                            <Icon name={item.icon} />
                                        </div>
                                        <div className="mb-3 text-body-lg-bold">
                                            {item.title}
                                        </div>
                                        <div className="max-w-94 text-body text-t-secondary max-lg:max-w-70 max-lg:[&_br]:hidden">
                                            {item.content}
                                        </div>
                                    </div>
                                    {index === 1 && (
                                        <div className="absolute top-0 right-0 max-lg:-right-49.5 max-md:-right-57.5">
                                            <Image
                                                src="/images/about-gradient.png"
                                                alt=""
                                                width={448}
                                                height={388}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
