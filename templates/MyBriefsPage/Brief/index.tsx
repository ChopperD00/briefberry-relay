import Link from "next/link";
import Icon from "@/components/Icon";

type BriefProps = {
    item: {
        id: string;
        title: string;
        category: string;
        time: string;
    };
};

const Brief = ({ item }: BriefProps) => (
    <Link
        className="group w-[calc(25%-1.5rem)] mt-6 mx-3 p-6 rounded-4xl bg-b-surface2 cursor-pointer transition-shadow hover:shadow-hover max-3xl:w-[calc(33.333%-1.5rem)] max-[1179px]:w-[calc(50%-1.5rem)] max-md:w-full max-md:mt-4 max-md:mx-0"
        href="/brief"
    >
        <div className="flex justify-center items-center size-11 mb-10 rounded-full border-[1.5px] border-primary1/15 bg-primary1/5">
            <Icon
                className="fill-primary1"
                name={
                    item.category === "ux-ui-design"
                        ? "post"
                        : item.category === "mobile-app"
                        ? "mobile"
                        : item.category === "branding-logo"
                        ? "bezier-curves"
                        : item.category === "illustration"
                        ? "magic-pencil"
                        : item.category === "3d-design"
                        ? "cube"
                        : "align-right"
                }
            />
        </div>
        <div className="mb-2 truncate text-body-bold text-t-primary/80 transition-colors group-hover:text-t-primary">
            {item.title}
        </div>
        <div className="text-small text-t-tertiary">{item.time}</div>
    </Link>
);

export default Brief;
