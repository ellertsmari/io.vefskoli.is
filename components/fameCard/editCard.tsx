// HALL OF FAME STUFF
// function to edit the name of the project and the picture url by using a fetch API to make a PUT request

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

    // using the useState hook to manage state for projectName and pictureUrl
    const [projectName, setProjectName] = useState(returns.projectName);
    const [pictureUrl, setPictureUrl] = useState(returns.pictureUrl);

    // function to edit the card
    const editCard = async () => {
        try {
            // sending a PUT request to api/returns with the updated data
            const response = await fetch("/api/returns", {
                method: "PUT",
                // converting the JavaScript objects to a JSON string
                body: JSON.stringify({
                    projectName,
                    pictureUrl,
                    id: returns._id
                }),
                // telling the server I'm sending JSON data
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                // if everything is ok, update the project name and picture url
                const updatedReturn = await response.json()
                setProjectName(projectName === '' ? updatedReturn.projectName : projectName);
                setPictureUrl(pictureUrl === '' ? updatedReturn.pictureUrl : pictureUrl);
                console.log("Project updated successfully");
                //reloading the page when the function is called
                location.reload()
            } else {
                console.error("Failed to update project");
            }
        // error handling if the fetch isn't successful
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    // the component returns a modal with a form to edit the card with onChange event handler
    return (
        <Modal>
            <GuideCardContainer>
                {/* change the name of the project */}
                <Label
                    placeholder="Change title"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    type="text"
                />
                {/* change the picture of the project */}
                <Label
                    placeholder="Change picture"
                    value={pictureUrl}
                    onChange={(e) => setPictureUrl(e.target.value)}
                    type="text"
                />
                {/* save changes, call the editCard function */}
                <button onClick={editCard}>Save</button>
                {/* remove the card from Hall of fame by calling the removeCard function */}
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