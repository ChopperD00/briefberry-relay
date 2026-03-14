import { useEffect, useRef, useState } from "react";

type TagsProps = {
    items: {
        value: string;
        title: string;
    }[];
    activeTag: string;
    setActiveTag: (value: string) => void;
};

const Tags = ({ items, activeTag, setActiveTag }: TagsProps) => {
    const tagsRef = useRef<HTMLDivElement>(null);
    const [scrollState, setScrollState] = useState<"start" | "middle" | "end">(
        "start"
    );

    const handleScroll = () => {
        if (tagsRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = tagsRef.current;
            if (scrollLeft === 0) {
                setScrollState("start");
            } else if (scrollLeft + clientWidth >= scrollWidth) {
                setScrollState("end");
            } else {
                setScrollState("middle");
            }
        }
    };

    useEffect(() => {
        const tagsElement = tagsRef.current;
        if (tagsElement) {
            tagsElement.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (tagsElement) {
                tagsElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div className="relative mr-6 w-[calc(100%-12.75rem)] max-md:w-full max-md:mb-2">
            <div
                className={`flex gap-3 py-2 overflow-auto scrollbar-none max-md:-mx-6 max-md:gap-0 max-md:before:shrink-0 max-md:before:w-6 max-md:after:shrink-0 max-md:after:w-6 ${
                    scrollState === "start" ? "mask-right" : ""
                } ${scrollState === "end" ? "mask-left" : ""} ${
                    scrollState === "middle" ? "mask-middle" : ""
                }`}
                ref={tagsRef}
            >
                {items.map((item) => (
                    <button
                        className={`shrink-0 h-8 px-4 bg-b-surface1 shadow-[inset_0_0_0_1.5px_var(--color-stroke1)] rounded-full text-hairline font-medium text-t-secondary transition-all hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary max-xl:hover:shadow-none max-md:not-last:mr-3 ${
                            activeTag === item.value
                                ? "bg-primary1/15! shadow-[inset_0_0_0_2px_var(--color-primary1)]! text-t-primary!"
                                : ""
                        }`}
                        key={item.value}
                        onClick={() => setActiveTag(item.value)}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tags;
