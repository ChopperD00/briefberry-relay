const Plug = ({}) => (
    <div
        className="
            relative z-2 grow rounded-4xl bg-b-subtle95 overflow-hidden
            before:absolute before:top-0 before:left-51 before:bottom-0 before:z-3 before:w-[1.5px] before:bg-linear-(--gradient-vertical) max-3xl:before:left-47 max-2xl:before:left-37
        "
    >
        <div
            className="
                absolute top-1/2 left-51 -right-12.5 min-h-185 px-15 py-18 -translate-y-1/2 max-3xl:left-47 max-3xl:-right-21.5 max-3xl:min-h-154 max-2xl:-right-40 max-2xl:left-37 max-2xl:min-h-auto max-2xl:pb-12
                before:absolute before:top-6 before:-left-11 before:bottom-6 before:w-131 before:rounded-2xl before:bg-b-surface1 before:shadow-[-24px_24px_48px_0px_rgba(0,0,0,0.05)]
                after:absolute after:inset-0 after:rounded-l-2xl after:bg-b-surface1 after:shadow-[-24px_24px_48px_0px_rgba(0,0,0,0.05)]
            "
        >
            <div className="absolute inset-2 z-2 rounded-lg border-[1.5px] border-stroke-subtle pointer-events-none"></div>
            <div className="relative z-2 flex flex-col items-start gap-12">
                <div className="w-49 h-3 rounded-xs bg-t-secondary/10"></div>
                <ul className="flex flex-col items-start gap-2.5 *:w-107.5 *:h-1.5 *:rounded-xs *:bg-t-secondary/10 max-3xl:*:w-96 *:first:w-49">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ul className="flex flex-col items-start gap-2.5 *:w-107.5 *:h-1.5 *:rounded-xs *:bg-t-secondary/10 max-3xl:*:w-96 *:first:w-49">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className="">
                    <div className="w-24 h-1.5 mb-6 rounded-xs bg-t-secondary/10"></div>
                    <div className="flex gap-3 *:w-24 *:h-27 *:bg-b-subtle *:rounded-xl">
                        <div className=""></div>
                        <div className=""></div>
                        <div className=""></div>
                        <div className=""></div>
                    </div>
                </div>
                <ul className="flex flex-col items-start gap-2.5 *:w-107.5 *:h-1.5 *:rounded-xs *:bg-t-secondary/10 max-3xl:*:w-96 max-2xl:hidden">
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div
                className="
                    pointer-events-none
                    before:absolute before:top-0 before:-left-51 before:z-3 before:w-360 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) max-3xl:before:-left-47 max-2xl:before:-left-37
                    after:absolute after:bottom-0 after:-left-51 after:z-3 after:w-360 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-3xl:after:-left-47 max-2xl:after:-left-37
            "
            ></div>
        </div>
    </div>
);

export default Plug;
