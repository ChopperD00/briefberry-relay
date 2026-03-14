"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Button from "@/components/Button";

const SettingsScreen = () => {
    const [name, setName] = useState("Kohaku Tora");
    const [email, setEmail] = useState("kohaku.tora@email.com");
    const [currentPassword, setCurrentPassword] = useState("1234567");
    const [newPassword, setNewPassword] = useState("1234567");
    const [confirmPassword, setConfirmPassword] = useState("1234567");

    return (
        <Layout isLoggedIn>
            <div className="px-6 py-12 max-md:py-8">
                <div className="w-full max-w-lg mx-auto">
                    <div className="mb-15 text-h1 max-md:mb-8">
                        Account settings
                    </div>
                    <div className="mb-15 max-md:mb-8">
                        <div className="mb-8 text-h4">Profile</div>
                        <div className="flex items-center mb-5">
                            <div className="group relative shrink-0 size-20 rounded-full overflow-hidden bg-b-surface2 after:absolute after:inset-0 after:z-1 after:bg-[#141414]/30 after:opacity-0 after:transition-opacity hover:after:opacity-100">
                                <Image
                                    className="size-20 object-cover opacity-100"
                                    src="/images/avatar.png"
                                    width={80}
                                    height={80}
                                    alt="avatar"
                                />
                                <input
                                    className="absolute inset-0 z-3 opacity-0 cursor-pointer"
                                    type="file"
                                />
                                <Icon
                                    className="absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 fill-[#FDFDFD] opacity-0 transition-opacity group-hover:opacity-100"
                                    name="camera-stroke"
                                />
                            </div>
                            <div className="grow pl-4 text-hairline text-t-secondary max-md:[&_br]:hidden">
                                Update your avatar by clicking the image{" "}
                                <br></br>
                                288x288 px size recommended in PNG or JPG format
                                only.
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <Field
                                label="Preferred name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                isLarge
                                required
                            />
                            <Field
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                isLarge
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-15 max-md:mb-8">
                        <div className="mb-8 text-h4">Security</div>
                        <div className="flex flex-col gap-5">
                            <Field
                                label="Current password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                type="password"
                                isLarge
                                required
                            />
                            <Field
                                label="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                isLarge
                                required
                            />
                            <Field
                                label="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                type="password"
                                isLarge
                                required
                            />
                        </div>
                    </div>
                    <Button isSecondary>Save changes</Button>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsScreen;
