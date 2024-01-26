import { MainContent } from '@/components/mainLayout';
import { UserWithIdType } from '@/models/user';
import Person from '@/components/person/person';

type Props = {
    student: UserWithIdType;
  };

  const people = async ({student}: Props) => {
    return (
      <>
        <MainContent>
          {/* Render the People component with the obtained user data */}
          <Person user={student}></Person>
        </MainContent>
      </>
    );
  };
  export default people;

/*export default async function people () {

    return(
        <MainContent>
            <h1>This is the people page</h1>
        </MainContent>
    )
}*/