import { useState } from "react";
import { cn } from "#/lib/utils";

interface GalleryImageProps {
	src: string;
	alt: string;
	fallbackChar: string;
	className?: string;
	fallbackClassName?: string;
	fallbackTextClassName?: string;
	onClick?: React.MouseEventHandler<HTMLImageElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLImageElement>;
}

export function GalleryImage({
	src,
	alt,
	fallbackChar,
	className,
	fallbackClassName,
	fallbackTextClassName = "text-7xl",
	onClick,
	onKeyDown,
}: GalleryImageProps) {
	const [failed, setFailed] = useState(false);

	if (failed) {
		return (
			<div
				className={cn(
					"flex items-center justify-center bg-muted",
					className,
					fallbackClassName,
				)}
			>
				<span
					className={cn(
						"font-display italic text-muted-foreground/20",
						fallbackTextClassName,
					)}
				>
					{fallbackChar}
				</span>
			</div>
		);
	}

	return (
		<img
			src={src}
			alt={alt}
			className={className}
			onClick={onClick}
			onKeyDown={onKeyDown}
			onError={() => setFailed(true)}
		/>
	);
}
