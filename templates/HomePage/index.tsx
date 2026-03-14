"use client";

import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";
import Hero from "./Hero";
import About from "./About";
import Start from "./Start";

const HomePage = () => {
    return (
        <Layout>
            <Hero />
            <About />
            <Pricing
                className="section"
                title="Start for free and upgrade to unlock more features"
            />
            <Start />
        </Layout>
    );
};

export default HomePage;
