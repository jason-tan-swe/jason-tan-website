import { ReactNode } from 'react';
import { BlockRenderer } from './BlockRenderer';
import { ImageRenderer } from './ImageRenderer';
import { IconHeaderRenderer } from './IconHeaderRenderer';
import { PortableTextBlock } from '@portabletext/types'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

type BlockContent = PortableTextBlock & {
  _key: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  listItem?: 'bullet';
  children: Array<{
    _type: 'span';
    text?: string;
    marks?: string[];
  }>;
}

interface ImageContent {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    _type: 'sanity.imageCrop';
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
}

type IconHeaderContent = {
  _type: 'iconHeader';
  _key: string;
  text: string;
  icon?: string;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export type ContentBlock = BlockContent | ImageContent | IconHeaderContent;

interface ContentRendererProps {
  details: ContentBlock[];
}

export const ContentRenderer = ({ details }: ContentRendererProps) => {
  if (!details) return null;

  return (
    <div className="space-y-4">
      {details.map((block) => {
        switch (block._type) {
          case 'block':
            return <BlockRenderer key={block._key} block={block as BlockContent} />;
          case 'image':
            return <ImageRenderer key={block._key} image={block as ImageContent} />;
          case 'iconHeader':
            return <IconHeaderRenderer key={block._key} header={block as IconHeaderContent} />;
          default:
            console.warn('Unhandled content type:', block._type);
            return null;
        }
      })}
    </div>
  );
} 