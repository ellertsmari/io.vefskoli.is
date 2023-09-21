import { Guide } from '@/models/guide';
import Calendar from 'react-calendar';
import Profile from './profile/profile';
import Link from 'next/link';
import { UserWithIdType } from '@/models/user';
import { connectToDatabase } from '@/utils/mongoose-connector';
import { CalendarContainer, NextUpContainer, ProfileContainer, Container } from './sidebar.style';

type Props = {
  student: UserWithIdType
}
const getGuides = async () => {
  await connectToDatabase();
  const guides = await Guide.find({});
  return guides;
}



async function Sidebar({student}:Props) {
  const date =  new Date();
  const guides = await getGuides();
  if (!student) return <>you need to log in</>;
  return (
    <>
      <Container>
        <ProfileContainer>
          <Profile user={student} />
          <h2>{student?.name}</h2>
          </ProfileContainer>
        <CalendarContainer>
          {/* <Calendar onChange={setDate} value={date}/> */}
          <Calendar value={date}/>
          </CalendarContainer>

        <NextUpContainer>
        <h2>Next up</h2>
        {guides.slice(0, 3).map((guide, index) => {
          return (
            <Link key={guide._id} href={`/guide/${guide._id}`} className='next'>
              <h3>Module {guide.module.title.slice(0,1)}</h3>
              <h4>{guide.title}</h4>   
            </Link>
          )
        })}
        </NextUpContainer>
        </Container>
      
    </>
  )
}


export default Sidebar;