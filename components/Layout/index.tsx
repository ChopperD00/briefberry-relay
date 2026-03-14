import { useState } from "react";
import Header from "@/components/Header";
import ThemeButton from "@/components/ThemeButton";
import Footer from "@/components/Footer";
import UpButton from "@/components/UpButton";

type Props = {
    className?: string;
    classContainer?: string;
    isFixedHeader?: boolean;
    isLoggedIn?: boolean;
    isVisiblePlan?: boolean;
    isHiddenFooter?: boolean;
    children: React.ReactNode;
};

const Layout = ({
    className,
    classContainer,
    isFixedHeader,
    isLoggedIn,
    isVisiblePlan,
    isHiddenFooter,
    children,
}: Props) => {
    const [loginOpen, setLoginOpen] = useState(isLoggedIn);

    return (
        <div
            className={`flex flex-col min-h-screen ${
                isVisiblePlan ? "relative" : ""
            } ${className || ""}`}
        >
            {isVisiblePlan && (
                <>
                    <div className="fixed left-0 top-0 right-0 z-2 h-32 pointer-events-none bg-linear-to-b from-b-surface1 from-50% to-transparent max-md:h-22 max-md:from-80%"></div>
                    <div className="fixed left-0 bottom-0 right-0 z-2 h-32 pointer-events-none bg-linear-to-t from-b-surface1 from-50% to-transparent max-md:h-22 max-md:from-80%"></div>
                </>
            )}
            <Header
                isFixed={isFixedHeader}
                login={loginOpen}
                isVisiblePlan={isVisiblePlan}
                onLogin={() => setLoginOpen(true)}
                onLogout={() => setLoginOpen(false)}
            />
            <div className={`grow ${classContainer || ""}`}>{children}</div>
            {!isHiddenFooter && <Footer />}
            <ThemeButton className="fixed! left-5 bottom-5 z-5" />
            <UpButton />
        </div>
    );
};

export default Layout;
