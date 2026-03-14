"use client";

import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import BriefSection from "@/components/BriefSection";
import BriefCategory from "@/components/BriefCategory";
import useEventsStore from "@/store/useEventsStore";
import Actions from "./Actions";

import { content } from "./content";

const BriefPage = () => {
    const isPremiumPlan = useEventsStore((state) => state.isPremiumPlan);

    return (
        <Layout isFixedHeader isHiddenFooter isVisiblePlan isLoggedIn>
            <div className="pt-34 px-6 pb-38 max-2xl:pt-32 max-2xl:px-11 max-2xl:pb-33 max-xl:pt-30 max-lg:pt-28 max-md:pt-22 max-md:px-4 max-md:pb-24">
                <div className="relative max-w-170 mx-auto p-12 shadow-hover bg-b-surface4 rounded-4xl before:absolute before:top-full before:left-6 before:right-6 before:-z-1 before:h-3.75 before:rounded-b-4xl before:bg-b-surface2 max-md:px-8 max-md:pb-4 max-md:before:hidden">
                    <Button
                        className="absolute! top-2 right-2 shadow-hover"
                        isCircle
                        isPrimary
                        as="link"
                        href="/quiz"
                    >
                        <Icon name="edit" />
                    </Button>
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
                    />
                    <BriefSection title="Goals" content={content.goals} />
                    <BriefSection title="Timeline" content={content.timeline} />
                    <BriefSection title="Budget" content={content.budget} />
                    <BriefSection
                        title="References"
                        content={content.references}
                        images={content.images}
                    />
                    <BriefSection
                        title="Conclusion"
                        content={content.conclusion}
                    />
                </div>
            </div>
            <Actions />
        </Layout>
    );
};

export default BriefPage;
