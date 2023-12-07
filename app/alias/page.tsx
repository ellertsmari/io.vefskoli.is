import StudentsDropDown from "./StudentsDropDown";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User } from "@/models/user";

const getUsers = async () => {
  await connectToDatabase();
  const users = await User.find();
  return users;
}
const AliasPage = async () => {
  const users = await getUsers();
  return (
    <div>
      <StudentsDropDown students={users} />
    </div>
  )
}

export default AliasPage;