import styled from "styled-components"

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap:10px;
`;

export const CalendarNavGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    font-size: 16px;
`
export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    background-color: white;
    border-radius: 16px;
    padding: 10px;
`

export const ArrowButton = styled.div`
    display:flex;
`

export const Month = styled.div`
    grid-column: span 1 / span 1;
`

export const CellContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
`

export const DaysContainer = styled.div`
    margin: 10px;
`
