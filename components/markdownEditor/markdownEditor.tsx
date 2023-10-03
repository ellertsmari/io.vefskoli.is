"use client"
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Container } from "./markdownEditor.style";

// type Props = {
//     handleInput: (text:string) => void;
// }

const MarkdownEditor = () => {
    const [text, setText] = useState("")

    const handleOnChange = (t:string | undefined) => {
        if(t !== undefined){
            setText(t)
        }
        
    }

    return ( 
        
            <Container data-color-mode="light" >
                <MDEditor value={text} onChange={handleOnChange}/>
            </Container>
     );
}
 
export default MarkdownEditor;