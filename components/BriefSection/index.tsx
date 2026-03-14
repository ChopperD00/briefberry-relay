import { RefObject, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Icon from "@/components/Icon";
import Images from "./Images";

type SectionProps = {
    title: string;
    content: React.ReactNode;
    images?: string[];
    isOnlyView?: boolean;
};

const BriefSection = ({ title, content, images, isOnlyView }: SectionProps) => {
    const [isRegenerate, setIsRegenerate] = useState(false);
    const [edit, setEdit] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref as RefObject<HTMLElement>, () => setEdit(false));

    const handleRegenerate = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsRegenerate(true);
        timerRef.current = setTimeout(() => {
            setIsRegenerate(false);
            timerRef.current = null;
        }, 3000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <div className="not-last:mb-6">
            <div className="py-2 text-h5">{title}</div>
            <div className="group relative">
                <div
                    className={`relative -mx-4 p-4 border-[1.5px] border-transparent rounded-2xl text-body text-t-primary-body [&_p]:not-last:mb-6 transition-colors ${
                        isOnlyView
                            ? ""
                            : "group-hover:border-stroke2 overflow-hidden"
                    } ${isRegenerate && !edit ? "border-stroke2!" : ""} ${
                        edit ? "border-primary1!" : ""
                    }`}
                    onClick={() => !isOnlyView && setEdit(true)}
                    ref={ref}
                >
                    {content}
                    {images && <Images images={images} edit={edit} />}
                </div>
                {!isOnlyView && !edit && (
                    <button
                        className={`absolute -top-4 right-0 flex items-center gap-2 h-7 px-3 rounded-full bg-b-surface2 border border-stroke2 text-small font-bold text-t-secondary fill-t-secondary transition-all invisible opacity-0 hover:text-t-primary hover:fill-t-primary group-hover:visible group-hover:opacity-100 ${
                            isRegenerate
                                ? "visible! opacity-100! text-primary2! fill-primary2!"
                                : ""
                        }`}
                        disabled={isRegenerate}
                        onClick={handleRegenerate}
                    >
                        <Icon
                            className="size-4! fill-inherit"
                            name="generation"
                        />
                        {isRegenerate ? "Regenerating..." : "Regenerate"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default BriefSection;
