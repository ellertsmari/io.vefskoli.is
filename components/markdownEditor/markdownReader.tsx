'use client'
import Markdown from 'react-markdown'

const MarkdownReader = ({children}:{children:string}) => {
  return (<Markdown>{children}</Markdown>)
}

export default MarkdownReader;