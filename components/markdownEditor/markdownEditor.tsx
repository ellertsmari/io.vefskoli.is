"use client"
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";
import { Container } from "./markdownEditor.style";

type Props = {
    value : string;
    onChange: (text:string) => void;
}

const MarkdownEditor = ({value, onChange}:Props) => {
    const [text, setText] = useState("edit this field")

    const handleOnChange = (t:string | undefined) => {
        if(t !== undefined){
            setText(t)
            onChange(t)
    }}

    useEffect(() => {
        setText(value);
    }, [value])

    return (
            <Container data-color-mode="light" >
                <MDEditor value={text} onChange={handleOnChange}/>
            </Container>
     );
}
 
export default MarkdownEditor;