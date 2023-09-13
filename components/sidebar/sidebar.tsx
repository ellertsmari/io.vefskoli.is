import './sidebar.scss';
import { Guide } from '@/models/guide';
import Calendar from 'react-calendar';
import ProfilePic from './profilepic';
import Link from 'next/link';
import { UserWithIdType } from '@/models/user';
import { connectToDatabase } from '@/utils/mongoose-connector';

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
      <section className="sidebar-container" >
        <div className="user-pic/name">
          <ProfilePic user={student} />
          <h2>{student?.name}</h2>
        </div>
        <div className='calendar'>
          {/* <Calendar onChange={setDate} value={date}/> */}
          <Calendar value={date}/>
        </div>
        <h2>Next up</h2>
        <div className="nextup-container">
        {guides.slice(0, 3).map((guide, index) => {
          return (
            <Link key={guide._id} href={`/guide/${guide._id}`} className='next'>
              <h3>Module {guide.module.title.slice(0,1)}</h3>
              <h4>{guide.title}</h4>   
            </Link>
          )
        })}
        </div>
      </section>
      
    </>
  )
}


export default Sidebar;