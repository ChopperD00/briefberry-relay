"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import EmptyPage from "./EmptyPage";

const QuizquizGeneratingPage = () => {
    const [countdown, setCountdown] = useState(5);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setTimeout(() => {
                        router.push("/brief");
                    });
                    return 1;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <Layout isFixedHeader isHiddenFooter isLoggedIn>
            <div className="relative flex min-h-svh p-2 overflow-hidden max-3xl:h-svh">
                <div className="">
                    <div className="absolute top-0 right-0 w-321 max-3xl:-right-35 max-2xl:-right-60 max-md:-right-85">
                        <Image
                            className="w-full"
                            src="/images/quiz-gradient-1.png"
                            width={1281}
                            height={735}
                            alt=""
                        />
                    </div>
                    <div className="absolute left-0 bottom-0 w-296">
                        <Image
                            className="w-full"
                            src="/images/quiz-gradient-2.png"
                            width={1185}
                            height={881}
                            alt=""
                        />
                    </div>
                </div>
                <div
                    className="
                        relative z-2 grow pt-42 px-4 border-[1.5px] border-stroke-subtle bg-b-surface1 rounded-4xl max-3xl:flex max-3xl:flex-col
                        before:absolute before:top-0 before:left-[calc(50%-40rem)] before:bottom-0 before:w-[1.5px] before:bg-linear-(--gradient-vertical) max-[1720px]:before:left-[calc(50%-30.5rem)] max-2xl:before:left-40 max-xl:before:left-17.5 max-lg:before:hidden
                        after:absolute after:top-0 after:right-[calc(50%-40rem)] after:bottom-0 after:w-[1.5px] after:bg-linear-(--gradient-vertical) max-[1720px]:after:right-[calc(50%-30.5rem)] max-2xl:after:right-40 max-xl:after:right-17.5 max-lg:after:hidden
                    "
                >
                    <div
                        className="
                            relative mb-42.5 text-center max-[1780px]:mb-18 max-2xl:mb-14
                            before:absolute before:-top-10 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) max-3xl:before:-top-6 max-md:before:w-3xl max-md:before:left-1/2 max-md:before:right-auto max-md:before:-translate-x-1/2
                            after:absolute after:left-0 after:right-0 after:-bottom-10 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-3xl:after:-bottom-6
                        "
                    >
                        <div className="max-w-167.5 mx-auto mb-8 text-hero max-3xl:max-w-118 max-3xl:text-h1 max-lg:leading-12 max-md:text-h3">
                            Your brief will be delivered in {countdown} seconds.
                        </div>
                        <div className="relative inline-flex p-2 rounded-[1.875rem] border-t-[0.5px] border-[#282828]/10 overflow-hidden shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.8)_inset,0px_6px_13px_0px_rgba(24,24,24,0.03)_inset,0px_6px_4px_-4px_rgba(24,24,24,0.05)_inset,0px_4.5px_1.5px_-4px_rgba(24,24,24,0.07)_inset] dark:shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.05)_inset,0px_6px_13px_0px_rgba(24,24,24,0.25)_inset,0px_6px_4px_-4px_rgba(24,24,24,0.50)_inset,0px_4.5px_1px_-4px_rgba(24,24,24,0.80)_inset]">
                            <div className="absolute top-0 left-0">
                                <Image
                                    className="w-full opacity-100"
                                    src="/images/button-gradient.png"
                                    width={135}
                                    height={59}
                                    alt=""
                                />
                            </div>
                            <div
                                className="
                                    relative inline-flex items-center justify-center gap-2.5 w-41 h-11
                                    before:absolute before:inset-0 before:rounded-[1.375rem] before:bg-[#fdfdfd]/70 before:backdrop-blur-[2rem] before:shadow-[0px_2.15px_0.5px_-2px_rgba(0,0,0,0.25),0px_24px_24px_-16px_rgba(8,8,8,0.04),0px_6px_13px_0px_rgba(8,8,8,0.03),0px_6px_4px_-4px_rgba(8,8,8,0.05),0px_5px_1.5px_-4px_rgba(8,8,8,0.09)] dark:before:bg-[#282828]/50
                                    after:absolute after:inset-0 after:rounded-[1.375rem] after:pointer-events-none after:border-[1.5px] after:border-white/90 after:mask-linear-170 after:mask-linear-from-1% after:mask-linear-to-70% dark:after:border-[#fdfdfd]/40
                                "
                            >
                                <span className="relative z-1 text-heading-thin font-bold text-t-primary/80">
                                    Generating
                                </span>
                                <Icon
                                    className="relative z-1 size-4! fill-primary1 animate-rotate"
                                    name="loader"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative h-127.5 mask-b-from-0 mask-b-to-80% text-center overflow-hidden max-3xl:mask-b-to-100% max-md:-mx-4">
                        <div className="relative h-187 max-md:h-102.5">
                            <EmptyPage className="absolute top-0 left-1/2 z-2 -translate-x-1/2" />
                            <EmptyPage className="absolute top-20 left-[calc(50%-26.5rem)] -rotate-8 max-3xl:left-[calc(50%-23.625rem)] max-xl:top-16 max-xl:left-[calc(50%-22.625rem)] max-md:top-9 max-md:max-md:left-[calc(50%-11.25rem)]" />
                            <EmptyPage className="absolute top-20 right-[calc(50%-26.5rem)] rotate-8 max-3xl:right-[calc(50%-23.625rem)] max-xl:top-16 max-xl:right-[calc(50%-22.625rem)] max-md:top-9 max-md:max-md:right-[calc(50%-11.25rem)]" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default QuizquizGeneratingPage;
