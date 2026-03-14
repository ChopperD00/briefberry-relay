import { useMemo, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import DatePicker from "react-datepicker";
import Field from "@/components/Field";
import "react-datepicker/dist/react-datepicker.css";

type MyDatePickerProps = {
    value: string;
    onChange: (e: { target: { value: string } }) => void;
};

const MyDatePicker = ({ value, onChange }: MyDatePickerProps) => {
    const [activeOption, setActiveOption] = useState<string | null>(null);

    const today = new Date();

    const formatDate = (date: Date | null): string => {
        if (date) {
            return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        }
        return "";
    };

    const parsedValueDate = useMemo(() => {
        const parsed = new Date(value);
        return isNaN(parsed.getTime()) ? null : parsed;
    }, [value]);

    const handleDateChange = (date: Date | null) => {
        onChange({ target: { value: formatDate(date) } });
        setActiveOption(null);
    };

    const handleInputChange = (e: { target: { value: string } }) => {
        onChange(e);
        setActiveOption(null);
    };

    const handleOptionClick = (option: string) => {
        const newDate = new Date();
        switch (option) {
            case "Today":
                break;
            case "Tomorrow":
                newDate.setDate(newDate.getDate() + 1);
                break;
            case "1 week":
                newDate.setDate(newDate.getDate() + 7);
                break;
            case "2 weeks":
                newDate.setDate(newDate.getDate() + 14);
                break;
            case "1 month":
                newDate.setMonth(newDate.getMonth() + 1);
                break;
            case "3 months":
                newDate.setMonth(newDate.getMonth() + 3);
                break;
        }
        onChange({ target: { value: formatDate(newDate) } });
        setActiveOption(option);
    };

    const options = [
        "Today",
        "Tomorrow",
        "1 week",
        "2 weeks",
        "1 month",
        "3 months",
    ];

    return (
        <>
            <Popover>
                {({ close }) => (
                    <>
                        <PopoverButton
                            className="group w-full outline-0 cursor-pointer"
                            as="div"
                        >
                            <Field
                                classInput="truncate cursor-pointer group-[[data-open]]:border-[#A8A8A8]/50!"
                                label="Select date"
                                value={value}
                                onChange={handleInputChange}
                                name="date"
                                placeholder="Write anytime here. e.g. tomorrow or 18 Oct 2024"
                                isLarge
                                required
                            />
                        </PopoverButton>
                        <PopoverPanel
                            anchor="bottom"
                            transition
                            className="flex [--anchor-gap:0.5rem] w-(--button-width) p-6 shadow-hover bg-b-surface2 rounded-3xl outline-0 origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 max-md:justify-center"
                        >
                            <div className="shrink-0">
                                <DatePicker
                                    calendarClassName="datepicker"
                                    selected={parsedValueDate}
                                    onChange={(date) => {
                                        handleDateChange(date);
                                        close();
                                    }}
                                    minDate={today}
                                    inline
                                />
                            </div>
                            <div className="flex flex-col grow gap-3 -mt-0.5 ml-6 max-md:hidden">
                                {options.map((option) => (
                                    <button
                                        className={`flex justify-center items-center w-full h-8 border-[1.5px] rounded-full text-hairline font-medium transition-all hover:border-stroke-highlight hover:text-t-primary ${
                                            activeOption === option
                                                ? "border-b-primary! text-t-primary!"
                                                : "border-stroke1 text-t-secondary"
                                        }`}
                                        key={option}
                                        onClick={() =>
                                            handleOptionClick(option)
                                        }
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </>
    );
};

export default MyDatePicker;
