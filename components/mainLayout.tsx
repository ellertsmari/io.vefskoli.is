'use client'
import styled from 'styled-components';

export const OverallLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 
  "sidebar main main main main main main";
  gap: 5rem;
  padding: 5rem;
`;


export const MainAndNavContainer = styled.div`
  max-width: 100%;
  grid-area: main;
`
export const MainContent = styled.div`
    max-width: 100%;
    height: 69dvh;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
    gap: 5rem;
    border-radius: 4.2rem;
    padding: 5rem;
    transition: 1s ease-in-out;
    overflow-y: scroll;
    overflow-x: hidden;
` 

export const SidebarContainer = styled.div`
  max-height: 100vh;
  grid-area: sidebar;
`

