"use client"

import { ArrowButton, CalendarContainer, CalendarGrid, CalendarNavGrid, DaysContainer, Month } from "./styles";
import Cell from "./Cell";


const MiniCalendar = ({}) => {
    const Days = [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S",
    ]

    const now = new Date()
    const weekDay = Days[now.getDay()]
    const month = now.getMonth()

    
    const empty = new Array((new Date(2023, month, 1)).getDay()).fill(undefined)
    console.log(empty)
    const cells = new Array(
        (new Date(2023, month + 1, 0)).getDate()
    ).fill(undefined)
    return (
        <>
    <CalendarContainer>
        <CalendarNavGrid>
            <ArrowButton style={{justifyContent:"flex-end"}}>{"<"}</ArrowButton>
            <Month>NOVEMBER</Month>
            <ArrowButton style={{justifyContent:"flex-start"}}>{">"}</ArrowButton>
        </CalendarNavGrid>
        <CalendarGrid >
            {Days.map((day) => <DaysContainer>{day}</DaysContainer>)}
            {empty.map((key, i)=><Cell></Cell>)}
            {cells.map((key, i)=><Cell>{i + 1}</Cell>)}
        </CalendarGrid>
    </CalendarContainer>
</>
    );
}
 
export default MiniCalendar;