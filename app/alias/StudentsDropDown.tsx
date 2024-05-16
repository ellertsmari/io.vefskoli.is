'use client'
import { useState } from "react";
import { Title } from "@/components/sidebar/sidebar.style";
import { SyntheticEvent } from "react";

type Student = {_id: string, name: string, email: string, role: string, password: string, createdAt: Date}
type Props = {
    students: [Student]
}
const StudentsDropDown = ({students}:Props) => {
  const [student, setStudent] = useState({_id : "", name: "sudo", email:"sudo", role:"sudo", password:"sudo", createdAt: new Date()});

  const selectStudent= (event:SyntheticEvent<HTMLSelectElement, Event>)=>{
    const s:Student = JSON.parse(event.currentTarget.value)
    console.log(s)
    if(student.name!=="sudo"){
      fetch(`/api/users/${s._id}`, {method: "POST"})
    }
    setStudent(s)

  }
  return (
    <div>
      <Title>you are now: {student.name==="sudo"?"yourself":student.name}</Title>
      <select onChange={selectStudent}>
        {students.map(s=><option key={s._id} value={JSON.stringify(s)}>{s.name}</option>)}
      </select>
    </div>
  )
}

export default StudentsDropDown;