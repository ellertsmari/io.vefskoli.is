import Profile from "./profile/profile";
import { UserWithIdType } from "@/models/user";
import { ProfileContainer, Container, Title } from "./sidebar.style";
import MiniCalendar from "./miniCalendar/miniCalendar";
import NextUp from "./nextup/nextUp";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide } from "@/models/guide";
import Dropdown from "../dropDown/dropDown";

type Props = {
  student: UserWithIdType;
};

const getGuides = async () => {
  await connectToDatabase();
  const guides = await Guide.find({});
  return guides;
};

async function Sidebar({ student }: Props) {
  const guides = await getGuides();
  if (!student) return <>you need to log in</>;
  if (student) {
    console.log("Logged in user ID:", student._id);
  } else {
    console.log("No logged in user found");
  }
  return (
    <Container>
      <ProfileContainer>
        <Profile user={student}/>
      </ProfileContainer>
      <MiniCalendar />
      <NextUp guides={JSON.parse(JSON.stringify(guides))} />
    </Container>
  );
}

export default Sidebar;
