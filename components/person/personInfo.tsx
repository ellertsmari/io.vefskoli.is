//<------ Module 5 group project ------>
//this is a component that gets displayed inside <PersonDropDown> 'app/components/person/person.tsx
//it displays details/informations about the users
import { Container, EmailFont, InfoFont, NameFont, PrimaryContainer, ProfilePicture, QuestionFont, SecondaryContainer, StyleDiv, FilledButton} from "./person-style";
import { UserWithIdType } from "@/models/user";

type Props = {
    isCurrentUser: boolean; // Indicates if the displayed user is the currently logged-in user
    onOpenUpdateProfile: () => void; // Function to call when the 'Update Profile' button is clicked
    userData: UserWithIdType; // Data of the user to be displayed
};

const PersonInfo = ({ userData, isCurrentUser, onOpenUpdateProfile }: Props) => {
    return (
        <Container>
            <PrimaryContainer>
                <ProfilePicture src={userData.avatarUrl || '/default-profile-picture.svg'} alt="user-pic" />
                <NameFont>{userData.name}</NameFont>
                <EmailFont>{userData.email}</EmailFont>
                {isCurrentUser && ( //if a user's dropdown is the same as the logged in user, a button shows to 'update profile'
                    <FilledButton onClick={onOpenUpdateProfile}>Update Profile</FilledButton>
                )}
            </PrimaryContainer>
            <SecondaryContainer>
                <StyleDiv><QuestionFont>Background:</QuestionFont> <InfoFont>{userData.background}</InfoFont></StyleDiv>
                <StyleDiv><QuestionFont>Career Goals:</QuestionFont> <InfoFont>{userData.careerGoals}</InfoFont></StyleDiv>
                <StyleDiv><QuestionFont>Interest:</QuestionFont> <InfoFont>{userData.interests}</InfoFont></StyleDiv>
                
            </SecondaryContainer>
        </Container>
    );
};

export default PersonInfo;