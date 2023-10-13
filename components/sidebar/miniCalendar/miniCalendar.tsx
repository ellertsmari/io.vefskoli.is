"use client"

import { CalendarContainer, StyledCalendar } from "./styles";

const MiniCalendar = () => {
    const date = new Date();
    return (
    <CalendarContainer>
        <StyledCalendar />
    </CalendarContainer>
    );
}
 
export default MiniCalendar;