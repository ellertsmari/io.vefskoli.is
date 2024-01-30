// HALL OF FAME STUFF

"use client";

import { useState } from "react";
import {
    Modal,
    Label,
    GuideCardContainer,
} from "../../components/fameCard/styles";
import Remove from "./removeCard";

// defining the type of the props that the edit component will receive
type Props = {
    returns: {
        _id: string;
        projectName: string;
        pictureUrl: string;
        vote: string;
    };
};

// the Edit component definition which receives one prop: 'returns'
const Edit = ({ returns }: Props) => {

    // using the useState hook to manage state for projectName, pictureUrl, and the modal
    const [projectName, setProjectName] = useState(returns.projectName);
    const [pictureUrl, setPictureUrl] = useState(returns.pictureUrl);
    const [closeModal, setCloseModal] = useState(false);
    
    // function to toggle the modal open/closed
    const handleCloseModal = () => {
        setCloseModal(!closeModal);
    };

    // function to edit the card, making a PUT request to api/returns
    const editCard = async () => {
        try {
            const response = await fetch("/api/returns", {
                method: "PUT",
                body: JSON.stringify({ projectName, pictureUrl, id: returns._id }),
            });
            if (response.ok) {
                setProjectName(projectName);
                setPictureUrl(pictureUrl);
                console.log("Project updated successfully");
            } else {
                console.error("Failed to update project");
            }

//error handling if the fetch isn't successful
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    // the component returns a modal with a form to edit the card
    return (
        <Modal>
            <GuideCardContainer>
                <Label
                    placeholder="Change title"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    type="text"
                />
                <Label
                    placeholder="Change picture"
                    value={pictureUrl}
                    onChange={(e) => setPictureUrl(e.target.value)}
                    type="text"
                />
                <button onClick={editCard}>Save</button>
                <Remove
                    returns={{
                        _id: returns._id,
                    }}
                ></Remove>
            </GuideCardContainer>
        </Modal>
    );
};

export default Edit;