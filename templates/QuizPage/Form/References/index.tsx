import { useState, useRef, DragEvent } from "react";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Button from "@/components/Button";

type ReferencesProps = {
    onLinksChange?: (links: string[]) => void;
    onFilesChange?: (files: File[]) => void;
};

const References = ({ onLinksChange, onFilesChange }: ReferencesProps) => {
    const [referenceLink, setReferenceLink] = useState("");
    const [links, setLinks] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const addFiles = (newFiles: FileList | File[]) => {
        const arr = Array.from(newFiles);
        if (!arr.length) return;
        const updated = [...files, ...arr];
        setFiles(updated);
        onFilesChange?.(updated);
    };

    const handleAddLink = () => {
        const trimmed = referenceLink.trim();
        if (!trimmed) return;
        const updated = [...links, trimmed];
        setLinks(updated);
        onLinksChange?.(updated);
        setReferenceLink("");
    };

    const handleRemoveLink = (index: number) => {
        const updated = links.filter((_, i) => i !== index);
        setLinks(updated);
        onLinksChange?.(updated);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addFiles(e.target.files);
        }
        e.target.value = "";
    };

    const handleRemoveFile = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onFilesChange?.(updated);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddLink();
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(e.dataTransfer.files);
        }
    };

    return (
        <div className="">
            {/* ── File upload zone ── */}
            <div
                className={`relative flex flex-col justify-center items-center h-50 mb-5 rounded-3xl bg-b-subtle max-md:h-40 cursor-pointer transition-colors ${
                    isDragging
                        ? "border-2 border-dashed border-primary1 bg-primary1/5"
                        : "hover:bg-b-subtle/80"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                />
                <Icon className="mb-1.5 fill-t-tertiary" name="camera" />
                <div className="text-button text-t-secondary">
                    {isDragging ? (
                        <span className="text-primary1">Drop files here</span>
                    ) : (
                        <>
                            Drag and drop images, or{" "}
                            <span className="text-t-primary">Browse</span>
                        </>
                    )}
                </div>
                <div className="text-small text-t-tertiary mt-1">
                    Upload multiple files at once
                </div>
            </div>

            {/* ── Uploaded file chips ── */}
            {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                    {files.map((file, i) => {
                        const isImage = file.type.startsWith("image/");
                        return (
                            <div
                                key={`${file.name}-${i}`}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-b-surface2 border border-stroke2 text-small text-t-secondary group"
                            >
                                {isImage && (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-6 h-6 rounded object-cover"
                                    />
                                )}
                                <span className="truncate max-w-48">{file.name}</span>
                                <span className="text-[10px] text-t-tertiary">({(file.size / 1024).toFixed(0)}KB)</span>
                                <button
                                    className="shrink-0 size-4 flex items-center justify-center rounded-full hover:bg-primary3/20 text-t-tertiary hover:text-primary3 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFile(i);
                                    }}
                                >
                                    \u00d7
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Link input ── */}
            <div className="flex items-end gap-3 mb-4">
                <div className="grow" onKeyDown={handleKeyDown}>
                    <Field
                        label="Reference link"
                        value={referenceLink}
                        onChange={(e) => setReferenceLink(e.target.value)}
                        name="reference-link"
                        placeholder="Enter your URL"
                        isLarge
                    />
                </div>
                <Button
                    className="px-5.5 shrink-0 h-16"
                    isStroke
                    onClick={handleAddLink}
                >
                    <Icon className="mr-2" name="plus" />
                    Add link
                </Button>
            </div>

            {/* ── Added links list ── */}
            {links.length > 0 && (
                <div className="flex flex-col gap-2">
                    {links.map((link, i) => (
                        <div
                            key={`${link}-${i}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-stroke2 bg-b-surface2 group"
                        >
                            <span className="text-small text-t-tertiary shrink-0">\ud83d\udd17</span>
                            <a
                                href={link.startsWith("http") ? link : `https://${link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-heading text-t-primary truncate hover:text-primary1 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {link}
                            </a>
                            <button
                                className="shrink-0 ml-auto size-6 flex items-center justify-center rounded-full hover:bg-primary3/20 text-t-tertiary hover:text-primary3 transition-colors opacity-0 group-hover:opacity-100"
                                onClick={() => handleRemoveLink(i)}
                            >
                                \u00d7
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default References;
