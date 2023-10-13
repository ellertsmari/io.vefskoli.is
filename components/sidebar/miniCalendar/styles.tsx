import styled from "styled-components"
import Calendar from "react-calendar";

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`
export const StyledCalendar = styled(Calendar)`
    max-width: 25rem;
    padding: 1.5rem;
    background-color: #FFFFFF;
    border-radius: 15px;

    &--doubleView{
      width: 70rem;
    }
    .react-calendar--doubleView .react-calendar__viewContainer {
     display: flex;
     margin: -0.5em;
   }
  
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  
   }    
`

export const Navigation = styled.div`
  
`
  

  // .react-calendar button {
  //   margin: 0;
  //   border: 0;
  //   outline: none;
  //   border-radius: 20px;
  // }
  
//   .react-calendar button:enabled:hover {
//     cursor: pointer;
//   }
    
//   .react-calendar__navigation {
//     display: flex;
//     height: 44px;
//     margin-bottom: 1em;
  
//   }
  
//   .react-calendar__navigation button {
//     min-width: 44px;
//     background: none;
//   }
  
//   .react-calendar__navigation button:disabled {
//     background-color: #f0f0f0;
//   }
  
//   .react-calendar__navigation button:enabled:hover,
//   .react-calendar__navigation button:enabled:focus {
//     background-color: #e6e6e6;
//   }
  
//   .react-calendar__month-view__weekdays {
//     text-align: center;
//     text-transform: uppercase;
//     font-weight: bold;
//     font-size: 0.75em;
//   }
  
//   .react-calendar__month-view__weekdays__weekday {
//     padding: 0.5em;
    
//   }
  
//   .react-calendar__month-view__weekNumbers .react-calendar__tile {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 0.75em;
//     font-weight: bold;
//   }
  
//   .react-calendar__month-view__days__day--weekend {
//     color: #d10000;
//   }
//   .react-calendar__month-view__days__day--neighboringMonth {
//     color: #757575;
//   }
  
//   .react-calendar__year-view .react-calendar__tile,
//   .react-calendar__decade-view .react-calendar__tile,
//   .react-calendar__century-view .react-calendar__tile {
//     padding: 2em 0.5em;
//   }
  
//   .react-calendar__tile {
//     max-width: 100%;
//     padding: 10px 6.6667px;
//     background: none;
//     text-align: center;
//     line-height: 16px;
//   }
  
//   .react-calendar__tile:disabled {
//     background-color: #f0f0f0;
//   }
    
//   .react-calendar__tile:enabled:hover,
//   .react-calendar__tile:enabled:focus {
//     background-color: #e6e6e6;
//   }
    
//   .react-calendar__tile--now {
//     background: #8482EF;
//   }
  
//   .react-calendar__tile--hasActive {
//     background: #76baff;
//   }
  
//   .react-calendar__tile--hasActive:enabled:hover,
//   .react-calendar__tile--hasActive:enabled:focus {
//     background: #a9d4ff;
//   }
  
//   .react-calendar__tile--active {
//     background: #6563EB;
//     color: white;
//   }
  
//   .react-calendar__tile--active:enabled:hover,
//   .react-calendar__tile--active:enabled:focus {
//     background: #D1D0F9;
//   }
    
//   .react-calendar--selectRange .react-calendar__tile--hover {
//     background-color: #e6e6e6;
//   }