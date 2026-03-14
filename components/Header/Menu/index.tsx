import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import ThemeButton from "@/components/ThemeButton";
import "react-circular-progressbar/dist/styles.css";

const navigation = [
    {
        title: "My briefs",
        icon: "documents",
        url: "/my-briefs",
    },
    {
        title: "Manage your plan",
        icon: "star-stroke",
        url: "/manage-plan",
    },
    {
        title: "Account settings",
        icon: "profile",
        url: "/settings",
    },
];

type Props = {
    onLogout: () => void;
};

const UserMenu = ({ onLogout }: Props) => {
    return (
        <Menu>
            <MenuButton className="relative flex size-12 border-4 border-b-surface2 rounded-full outline-0 before:absolute before:-inset-1 before:z-1 before:rounded-full before:border-[1.5px] before:border-stroke2 before:opacity-0 before:transition-opacity data-open:before:opacity-100">
                <Image
                    className="size-10 object-cover rounded-full opacity-100"
                    src="/images/avatar.png"
                    width={40}
                    height={40}
                    alt="Avatar"
                />
            </MenuButton>
            <MenuItems
                className="z-20 [--anchor-gap:0.75rem] w-62 shadow-hover bg-b-surface2 rounded-3xl outline-0 origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                anchor="bottom end"
                transition
            >
                <div className="p-3">
                    <div className="">
                        {navigation.map((item, index) => (
                            <MenuItem key={index}>
                                <Link
                                    className="flex items-center w-full h-12 px-3 rounded-2xl text-hairline font-medium text-t-secondary fill-t-secondary transition-colors hover:bg-b-highlight hover:text-t-primary hover:fill-t-primary"
                                    href={item.url}
                                >
                                    <Icon
                                        className="mr-4 fill-inherit"
                                        name={item.icon}
                                    />
                                    {item.title}
                                </Link>
                            </MenuItem>
                        ))}
                    </div>
                    <div className="flex items-center w-full h-12 px-3 text-hairline font-medium text-t-secondary max-md:hidden">
                        <div className="size-6 mr-4 p-0.5">
                            <CircularProgressbar
                                value={20}
                                strokeWidth={16}
                                styles={buildStyles({
                                    pathColor: "var(--color-primary1)",
                                    trailColor: "var(--color-bg-surface3)",
                                })}
                            />
                        </div>
                        <div className="">
                            Credits: <span className="text-t-primary">1/5</span>
                        </div>
                        <Link
                            className="ml-5 px-2 py-0.5 border-[1.5px] border-primary2/15 bg-primary2/5 rounded-full text-hairline font-medium text-primary2 transition-colors hover:border-primary2/25 hover:bg-primary2/10"
                            href="/manage-plan"
                        >
                            Upgrade
                        </Link>
                    </div>
                </div>
                <div className="p-3 border-t border-stroke-subtle">
                    <div className="hidden items-center w-full h-12 pl-3 text-hairline text-t-secondary max-md:flex">
                        <Icon className="mr-4 fill-t-secondary" name="bulb" />
                        <div className="">Theme</div>
                        <ThemeButton className="ml-auto" isHorizontal />
                    </div>
                    <button
                        className="flex items-center w-full h-12 px-3 rounded-2xl text-hairline font-medium text-t-secondary fill-t-secondary transition-colors hover:bg-b-highlight hover:text-t-primary hover:fill-t-primary"
                        onClick={onLogout}
                    >
                        <Icon className="mr-4 fill-inherit" name="logout" />
                        Log out
                    </button>
                </div>
            </MenuItems>
        </Menu>
    );
};

export default UserMenu;
