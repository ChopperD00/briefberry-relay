import Icon from "@/components/Icon";

type FeatureProps = {
    item: {
        title?: string;
        generations?: number;
    };
    cancel?: boolean;
};

const Feature = ({ item, cancel }: FeatureProps) => (
    <div
        className={`flex text-body font-medium fill-primary2 ${
            item.generations ? "text-accent2 fill-accent2!" : ""
        } ${cancel ? "fill-primary3!" : ""}`}
    >
        <Icon
            className="size-4! shrink-0 mt-0.75 mr-4 fill-inherit"
            name={
                cancel
                    ? "close-small"
                    : item.generations
                    ? "text-generation"
                    : "check"
            }
        />
        {item.generations
            ? `${item.generations} generation credits/month`
            : item.title}
    </div>
);

export default Feature;
