"use client";

import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";

const ManagePlanScreen = () => {
    return (
        <Layout classContainer="flex items-center" isLoggedIn>
            <Pricing
                className="w-full pt-15 pb-21 max-3xl:pt-8 max-3xl:pb-14 max-md:pb-8"
                title="Manage your plan"
                hideCircleButton
            />
        </Layout>
    );
};

export default ManagePlanScreen;
