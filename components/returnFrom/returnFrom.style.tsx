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
    justify-content: left;
    flex-direction: column;
`