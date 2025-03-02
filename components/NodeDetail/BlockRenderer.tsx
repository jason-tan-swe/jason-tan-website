import { PortableTextBlock } from '@portabletext/types'

interface BlockRendererProps {
  block: PortableTextBlock & {
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
    listItem?: 'bullet';
    children: Array<{
      _type: 'span';
      text?: string;
      marks?: string[];
    }>;
  }
}

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  // Handle different block styles
  if (block.style === 'blockquote') {
    return (
      <blockquote className="pl-4 border-l-4 border-gray-400 italic">
        {block.children.map((child, i) => (
          <span key={i}>{child.text}</span>
        ))}
      </blockquote>
    )
  }

  // Handle bullet lists
  if (block.listItem === 'bullet') {
    return (
      <li className="ml-4">
        {block.children.map((child, i) => (
          <span key={i}>{child.text}</span>
        ))}
      </li>
    )
  }

  // Handle headings
  const style = block.style || 'normal'
  switch (style) {
    case 'h1':
      return <h1 className="text-4xl font-bold mt-8 mb-4">{block.children.map(child => child.text).join('')}</h1>
    case 'h2':
      return <h2 className="text-3xl font-bold mt-6 mb-3">{block.children.map(child => child.text).join('')}</h2>
    case 'h3':
      return <h3 className="text-2xl font-bold mt-4 mb-2">{block.children.map(child => child.text).join('')}</h3>
    case 'h4':
      return <h4 className="text-xl font-bold mt-3 mb-2">{block.children.map(child => child.text).join('')}</h4>
    default:
      return (
        <p className="mb-4">
          {block.children.map((child, i) => {
            const hasMarks = child.marks && child.marks.length > 0
            if (!hasMarks) return <span key={i}>{child.text}</span>

            // Handle text marks (bold, italic, etc)
            return (
              <span 
                key={i}
                className={child.marks?.map((mark: string) => {
                  switch (mark) {
                    case 'strong':
                      return 'font-bold'
                    case 'em':
                      return 'italic'
                    case 'underline':
                      return 'underline'
                    case 'strike-through':
                      return 'line-through'
                    case 'code':
                      return 'font-mono bg-gray-800 rounded px-1'
                    default:
                      return ''
                  }
                }).join(' ')}
              >
                {child.text}
              </span>
            )
          })}
        </p>
      )
  }
} 