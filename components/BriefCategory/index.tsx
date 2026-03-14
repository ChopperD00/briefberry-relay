import Icon from "@/components/Icon";

type Props = {
    value: string;
};

const BriefCategory = ({ value }: Props) => (
    <div className="flex items-center gap-2 text-heading text-t-secondary">
        <Icon
            className="fill-t-secondary"
            name={
                value === "ux-ui-design"
                    ? "post"
                    : value === "mobile-app"
                    ? "mobile"
                    : value === "branding-logo"
                    ? "bezier-curves"
                    : value === "illustration"
                    ? "magic-pencil"
                    : value === "3d-design"
                    ? "cube"
                    : "align-right"
            }
        />
        {value === "ux-ui-design"
            ? "UI/UI Design"
            : value === "mobile-app"
            ? "Mobile App"
            : value === "branding-logo"
            ? "Branding & logo"
            : value === "illustration"
            ? "Illustration"
            : value === "3d-design"
            ? "3D Design"
            : "Web app"}
    </div>
);

export default BriefCategory;
