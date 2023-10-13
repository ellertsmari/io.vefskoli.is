import { Guide } from "@/models/guide";
import { AggregatedGuide } from "@/utils/types/types";
import Profile from "./profile/profile";
import { UserWithIdType } from "@/models/user";
import { connectToDatabase } from "@/utils/mongoose-connector";
import {
  NextUpContainer,
  ProfileContainer,
  Container,
  StyledLink,
  Title,
  NextUpCard,
} from "./sidebar.style";
import MiniCalendar from "./miniCalendar/miniCalendar";

type Props = {
  student: UserWithIdType;
  guidesForNextUp: AggregatedGuide[]
};

const getGuides = async () => {
  await connectToDatabase();
  const guides = await Guide.find({});
  return guides;
};

async function Sidebar({ student }: Props) {
  const guides = await getGuides();
  if (!student) return <>you need to log in</>;
  return (
    <Container>
      <ProfileContainer>
        <Profile user={student} />
        <Title>{student?.name}</Title>
      </ProfileContainer>
      
      <MiniCalendar />

      <NextUpContainer>
        <Title>Next up</Title>
        {guides.slice(0, 3).map((guide, index) => {
          return (
            <NextUpCard title={guide.title} key={guide._id}>
              <StyledLink href={`/guide/${guide._id}`} className="next">
                <h3>Module {guide.module.title.slice(0, 1)}</h3>
                <h4>{guide.title}</h4>
              </StyledLink>
            </NextUpCard>
          );
        })}
      </NextUpContainer>
    </Container>
  );
}

export default Sidebar;
