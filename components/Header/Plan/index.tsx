import Icon from "@/components/Icon";
import Button from "@/components/Button";
import useEventsStore from "@/store/useEventsStore";

const Plan = ({}) => {
    const isPremiumPlan = useEventsStore((state) => state.isPremiumPlan);

    return (
        <div className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-md:hidden">
            {isPremiumPlan ? (
                <div className="flex items-center gap-2 text-body-bold">
                    <Icon className="fill-primary2" name="verification" />
                    <div className="">UI8 Studio 2024</div>
                </div>
            ) : (
                <>
                    <button className="flex items-center gap-2 h-12 px-3 rounded-3xl text-body-bold transition-colors group-hover:bg-b-surface2">
                        <Icon
                            className="fill-t-tertiary transition-colors group-hover:fill-t-primary"
                            name="lock"
                        />
                        <div className="">UI8 Studio 2024</div>
                    </button>
                    <div className="absolute top-full left-1/2 w-115 pt-4 -translate-x-1/2 invisible opacity-0 transition-all group-hover:opacity-100 group-hover:visible">
                        <div className="dropdown-arrow-up relative flex p-6 rounded-4xl bg-b-surface2 shadow-hover">
                            <div className="grow pr-6">
                                <div className="mb-1 text-body-lg-bold">
                                    Go premium!
                                </div>
                                <div className="text-heading-thin text-t-secondary">
                                    Unlock all premium features for just
                                    $4.99/month. Enjoy section regeneration, PDF
                                    export, and email sharing!
                                </div>
                            </div>
                            <Button className="" isSecondary>
                                Upgrade
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Plan;
