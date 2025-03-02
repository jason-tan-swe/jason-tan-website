import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from '@/sanity/lib/client'
import { internalGroqTypeReferenceTo, SanityImageHotspot, SanityImageCrop } from '@/sanity/sanity.types'

interface ImageRendererProps {
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
}

export const ImageRenderer = ({ image }: ImageRendererProps) => {
  const imageProps = useNextSanityImage(client, image)

  if (!imageProps) return null

  return (
    <div className="relative w-full md:w-2/3 lg:w-1/2 mx-auto aspect-video">
      <Image
        src={imageProps.src}
        alt={image.alt || 'Content image'}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
        priority={false}
        loading="lazy"
      />
    </div>
  )
} 