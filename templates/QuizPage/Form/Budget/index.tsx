import { useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const Budget = ({}) => {
    const [scopeOfWork, setScopeOfWork] = useState("");
    const [scopeOfWork1, setScopeOfWork1] = useState("");
    const [budget, setBudget] = useState("");
    const [budget1, setBudget1] = useState("");

    return (
        <div className="">
            <div className="relative mb-5">
                <div className="flex">
                    <Field
                        className="w-[calc(50%+0.0625rem)] -mr-0.25 max-md:grow"
                        classInput="relative rounded-r-none! focus:z-1"
                        label="Scope of work"
                        value={scopeOfWork}
                        onChange={(e) => setScopeOfWork(e.target.value)}
                        placeholder="e.g Landing page design"
                        isLarge
                        required
                    />
                    <Field
                        className="w-[calc(50%+0.0625rem)] -ml-0.25 max-md:w-30"
                        classInput="relative rounded-l-none! focus:z-1"
                        label="Budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="0"
                        currency="$"
                        isLarge
                        required
                    />
                </div>
            </div>
            <div className="group relative mb-5">
                <div className="flex">
                    <Field
                        className="w-[calc(50%+0.0625rem)] -mr-0.25 max-md:grow"
                        classInput="relative rounded-r-none! focus:z-1 group-hover:border-[#A8A8A8]/50"
                        label="Scope of work"
                        value={scopeOfWork1}
                        onChange={(e) => setScopeOfWork1(e.target.value)}
                        placeholder="e.g Landing page design"
                        isLarge
                        required
                    />
                    <Field
                        className="w-[calc(50%+0.0625rem)] -ml-0.25 max-md:w-30"
                        classInput="relative rounded-l-none! focus:z-1 group-hover:border-[#A8A8A8]/50"
                        label="Budget"
                        value={budget1}
                        onChange={(e) => setBudget1(e.target.value)}
                        placeholder="0"
                        currency="$"
                        isLarge
                        required
                    />
                </div>
                <Button
                    className="absolute! -top-1.5 -right-4 z-3 size-8! invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 max-md:visible max-md:opacity-100"
                    isPrimary
                    isCircle
                >
                    <Icon className="size-4!" name="close" />
                </Button>
            </div>
            <Button className="px-5.5" isStroke>
                <Icon className="mr-2" name="plus" />
                Add more
            </Button>
        </div>
    );
};

export default Budget;
