'use client'
import MDEditor from "@uiw/react-md-editor";

const MarkdownReader = ({children}:{children:string}) => {
  return (<div data-color-mode="light">
    <MDEditor.Markdown source={children}></MDEditor.Markdown>
  </div>)
}

export default MarkdownReader;