import StudentsDropDown from "./StudentsDropDown";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User } from "@/models/user";


type Student = {_id: string, name: string, email: string, role: string, password: string, createdAt: Date}
const getUsers = async () => {
  await connectToDatabase();
  const users = await User.find();
  
  return users.map((user) => ({...user._doc, _id: user._doc._id.toString()})) as [Student];
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