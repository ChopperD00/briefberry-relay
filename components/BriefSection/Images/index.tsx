import Image from "@/components/Image";
import Icon from "@/components/Icon";

type Props = {
    images: string[];
    edit: boolean;
};

const Images = ({ images, edit }: Props) => {
    return (
        <div className="flex -mx-12 overflow-auto scrollbar-none max-md:-mx-8 before:shrink-0 before:w-12 after:shrink-0 after:w-12 max-md:before:w-8 max-md:after:w-8">
            {edit && (
                <div className="relative flex items-center justify-center shrink-0 w-32 mr-3 bg-b-subtle rounded-2xl">
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Icon className="fill-t-secondary" name="camera-stroke" />
                </div>
            )}
            {images.map((image, index) => (
                <div
                    className="group/image relative shrink-0 w-32 not-last:mr-3"
                    key={index}
                >
                    <Image
                        className="w-full rounded-2xl"
                        src={image}
                        width={128}
                        height={96}
                        alt=""
                    />
                    {edit && (
                        <button className="absolute top-1 right-1 size-6 bg-b-surface1 rounded-full text-0 fill-t-secondary invisible opacity-0 transition-all hover:fill-t-primary group-hover/image:visible group-hover/image:opacity-100">
                            <Icon
                                className="size-5! fill-inherit"
                                name="close-small"
                            />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Images;
