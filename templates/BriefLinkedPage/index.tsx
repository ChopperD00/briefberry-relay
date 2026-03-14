"use client";

import Icon from "@/components/Icon";
import BriefSection from "@/components/BriefSection";
import BriefCategory from "@/components/BriefCategory";
import useEventsStore from "@/store/useEventsStore";
import ThemeButton from "@/components/ThemeButton";
import UpButton from "@/components/UpButton";

import { content } from "./content";

const BriefLinkedPage = () => {
    const isPremiumPlan = useEventsStore((state) => state.isPremiumPlan);

    return (
        <>
            <div className="py-20 px-6 max-md:py-8 max-md:px-4">
                <div className="relative max-w-170 mx-auto px-8 py-12 shadow-hover bg-b-surface4 rounded-4xl overflow-hidden max-md:px-6 max-md:py-8 max-md:rounded-3xl">
                    <div className="mb-10 max-md:mb-6">
                        <div className="mb-2 text-h2 max-md:text-h5">
                            <Icon
                                className={`hidden! relative -top-0.5 mr-2 fill-primary2 max-md:inline-block! max-md:size-5! ${
                                    isPremiumPlan
                                        ? "fill-primary2"
                                        : "fill-t-tertiary"
                                }`}
                                name={isPremiumPlan ? "verification" : "lock"}
                            />
                            UI8 Studio 2024
                        </div>
                        <BriefCategory value="ux-ui-design" />
                    </div>
                    <BriefSection
                        title="Introduction"
                        content={content.introduction}
                        isOnlyView
                    />
                    <BriefSection
                        title="Goals"
                        content={content.goals}
                        isOnlyView
                    />
                    <BriefSection
                        title="Timeline"
                        content={content.timeline}
                        isOnlyView
                    />
                    <BriefSection
                        title="Budget"
                        content={content.budget}
                        isOnlyView
                    />
                    <BriefSection
                        title="References"
                        content={content.references}
                        images={content.images}
                        isOnlyView
                    />
                    <BriefSection
                        title="Conclusion"
                        content={content.conclusion}
                        isOnlyView
                    />
                </div>
            </div>
            <ThemeButton className="fixed! left-5 bottom-5 z-5" />
            <UpButton />
        </>
    );
};

export default BriefLinkedPage;
