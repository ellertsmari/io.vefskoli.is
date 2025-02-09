"use client";
import styled from "styled-components";

export const Card = styled.div`
  background-color: white;
  padding: 1rem;
  height: 25.6rem;
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #6563eb;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.div`
  font-size: 2rem;
`;

export const ReturnCount = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

export const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, 1fr));
  gap: 1rem;
`;

export const Heading = styled.h1`
    font-size: 3rem;
`
