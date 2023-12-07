'use client'
import { useState, useEffect } from "react";
import Dropdown from '@/components/dropDown/dropDown';
import { UserWithIdType } from "@/models/user";
import { Title } from "@/components/sidebar/sidebar.style";

type Props = {
    students: Array<UserWithIdType>
}
const StudentsDropDown = ({students}:Props) => {
  const [student, setStudent] = useState("sudo");
  useEffect(() => {
    if(student!=="sudo"){
      fetch(`/api/users/${JSON.parse(student)._id}`, {method: "POST"})
    }
    else{
      console.log("no student selected");
    }
  }, [student])
  return (
    <div>
      <Title>you are now: {student==="sudo"?"yourself":JSON.parse(student).name}</Title>
      <Dropdown options={students.map(s=>JSON.stringify(s))} selected={student} setSelected={setStudent} />
    </div>
  )
}

export default StudentsDropDown;