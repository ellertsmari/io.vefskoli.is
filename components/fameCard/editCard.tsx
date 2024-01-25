'use client'
import { useState } from "react";
import { ObjectId } from "mongoose";
import { Modal, Label, GuideCardContainer } from "../../components/fameCard/styles";

//Props with the property "returns"
//The returns is an object with three string properties
type Props = {
    returns: {
        _id: string;
        projectName: string;
        pictureUrl: string;
    }

}
//A component for editing projects, fetching the data with the PUT method and a useState hook to manage the state
const Edit = ({returns}:Props) => {
    const [projectName, setProjectName] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const editCard = ()=> {
        fetch ('/api/hallOfFame', {
            method: "PUT",
            body: JSON.stringify({projectName, pictureUrl, id:returns._id})
        })
       
    }

//A modal that allows the user to change the name of the project as well as the picture representing the project
//onChange handlers update their values
return(
    <Modal>
    <GuideCardContainer>
      <Label placeholder="Change title" value={projectName} onChange={(e) =>setProjectName(e.target.value)} type="text" />
      <Label placeholder="Change picture" value={pictureUrl} onChange={(e)=>setPictureUrl(e.target.value)} type="text" />
      <button onClick={editCard}>Save</button>
    </GuideCardContainer>
  </Modal>

)



}
export default Edit