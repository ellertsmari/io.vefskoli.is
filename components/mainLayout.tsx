'use client'
import styled from 'styled-components';

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 
  "sidebar main main main main main main";
  gap: 5rem;
  padding: 5rem;
`;


export const MainContent = styled.div`
  max-width: 100%;
  grid-area: main;
`

export const SidebarContainer = styled.div`
  max-height: 100vh;
  grid-area: sidebar;
`