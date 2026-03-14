"use client";

import Layout from "@/components/Layout";
import Image from "@/components/Image";
import Plug from "./Plug";
import Form from "./Form";

const QuizPage = () => {
    return (
        <Layout
            className="max-md:block max-md:min-h-auto"
            isFixedHeader
            isHiddenFooter
            isLoggedIn
        >
            <div className="flex min-h-svh">
                <div className="flex justify-center items-center grow px-8 py-22 max-2xl:pb-16 max-md:min-h-svh max-md:pt-25 max-md:px-6 max-md:pb-6">
                    <Form />
                </div>
                <div className="relative flex flex-col shrink-0 w-200 p-2.5 pl-0 max-3xl:w-173 max-2xl:w-142.5 max-xl:hidden">
                    <div className="absolute top-0 right-0">
                        <Image
                            src="/images/quiz-gradient.png"
                            width={692}
                            height={549}
                            alt=""
                        />
                    </div>
                    <Plug />
                </div>
            </div>
        </Layout>
    );
};

export default QuizPage;
