import Image from "next/image"

/** Galeria de imagens de um case, em grade de dois por linha. */

interface GalleryImage {
    src: string
    alt: string
}

interface GalleryProps {
    images: GalleryImage[]
}

const Gallery = ({ images }: GalleryProps) => (
    <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2">
        {images.map((image) => (
            <div
                key={image.src}
                className="overflow-hidden rounded-xl border bg-card"
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
        ))}
    </div>
)

export { Gallery }
export type { GalleryImage, GalleryProps }
