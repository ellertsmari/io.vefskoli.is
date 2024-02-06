import styled from "styled-components";

export const BackgroundOverlay = styled.div`
    position: absolute;
    z-index: 1;
    background-color: rgba(0,0,0,0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Modal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100rem;
    height: 90rem;
    background-color: white;
    border-radius: 4.5rem;
`

export const FormContainer = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;
`
export const ReturnDetails = styled.div`
    display:flex;
    flex-direction: column;
    width: 50%;
`

export const FeedbackGrade = styled.div`
    display:flex;
    flex-direction: column;
    width: 50%;
    padding: 10rem;
`

export const GradeSlider = styled.input`
    color: blue;
    width: 100%;
`
export const SliderContainer = styled.div`
`
export const SliderLables = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`
export const Grades = styled.span<{ isActive: boolean}>`
    display: inline-block;
  width: 10%;
  text-align: center;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ isActive }) => (isActive ? 'red' : 'inherit')};
`

export const ProjectTitle = styled.h1`
    font-family: "poppins";
    font-size: 3.2rem;
    font-weight: 500;
`

export const SubTitle = styled.h2`
    font-family: poppins;
    font-size: 2rem;
    font-weight: 500;
`

export const Text = styled.p`
    font-family: poppins;
    font-size: 1.6rem;
    line-height: 2.5rem;
`

