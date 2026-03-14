import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "@/components/Image";

const EmptyBriefs = ({}) => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 50);
    }, []);

    return (
        <div className="pt-28 px-20 text-center max-3xl:pt-12 max-3xl:pb-8 max-md:pt-6 max-md:px-0 max-md:pb-10">
            <div className="-mr-4 mb-12 max-md:relative max-md:h-64 max-md:mb-6">
                <div className="max-md:absolute max-md:top-0 max-md:left-1/2 max-md:w-158 max-md:-translate-x-1/2">
                    {isMounted && (
                        <Image
                            className="w-158 max-3xl:w-auto max-3xl:h-64"
                            src={
                                theme === "dark"
                                    ? "/images/empty-briefs-dark.png"
                                    : "/images/empty-briefs-light.png"
                            }
                            width={632}
                            height={300}
                            alt="Empty briefs"
                        />
                    )}
                </div>
            </div>
            <div className="mb-2 text-h5">No brief found</div>
            <div className="text-hairline text-t-secondary [&_span]:text-t-primary">
                Try to adjust your filter or <span>create a new brief</span>
            </div>
        </div>
    );
};

export default EmptyBriefs;
