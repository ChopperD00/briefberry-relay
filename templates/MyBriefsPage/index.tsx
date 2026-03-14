"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Select from "@/components/Select";
import Tags from "./Tags";
import Brief from "./Brief";
import EmptyBriefs from "./EmptyBriefs";

import { myBriefs } from "./briefs";

const tags = [
    {
        title: "All briefs",
        value: "all-briefs",
    },
    {
        title: "Web app",
        value: "web-app",
    },
    {
        title: "UX/UI Design",
        value: "ux-ui-design",
    },
    {
        title: "Mobile app",
        value: "mobile-app",
    },
    {
        title: "Branding & logo",
        value: "branding-logo",
    },
    {
        title: "Illustration",
        value: "illustration",
    },
    {
        title: "3D Design",
        value: "3d-design",
    },
];

const MyBriefsPage = () => {
    const [activeTag, setActiveTag] = useState("all-briefs");
    const options = [
        { id: 0, name: "Most recent" },
        { id: 1, name: "Popular" },
        { id: 2, name: "Most liked" },
    ];

    const [category, setCategory] = useState(options[0]);

    return (
        <Layout isLoggedIn>
            <div className="py-20 max-[1179px]:py-16 max-lg:py-12 max-md:py-8 max-md:overflow-hidden">
                <div className="max-w-334 mx-auto px-12 max-3xl:max-w-304 max-2xl:max-w-280 max-[1179px]:max-w-232 max-md:px-6">
                    <div className="mb-8 text-h1 max-md:mb-6">My briefs</div>
                    <div className="flex justify-between mb-12 max-md:block max-md:mb-8">
                        <Tags
                            items={tags}
                            activeTag={activeTag}
                            setActiveTag={setActiveTag}
                        />
                        <Select
                            className="min-w-45"
                            value={category}
                            onChange={setCategory}
                            options={options}
                        />
                    </div>
                    <div className="flex flex-wrap -mt-6 -mx-3 max-md:-mt-4 max-md:mx-0">
                        {myBriefs
                            .filter((brief) =>
                                activeTag === "all-briefs"
                                    ? true
                                    : brief.category === activeTag
                            )
                            .map((brief) => (
                                <Brief item={brief} key={brief.id} />
                            ))}
                    </div>
                    {myBriefs.filter((brief) =>
                        activeTag === "all-briefs"
                            ? true
                            : brief.category === activeTag
                    ).length === 0 && <EmptyBriefs />}
                </div>
            </div>
        </Layout>
    );
};

export default MyBriefsPage;
