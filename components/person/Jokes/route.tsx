import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import { Button } from "../person-style";

interface Joke {
    title: string;
    text: string;
}

interface ButtonProps {
    isHovered: boolean
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const Container = styled.div`
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 15px;
    background-color: #f9f9f9;
    color: #000;
    display: flex;
    position: absolute;
    left: 0;
    z-index: 1;
`;

const JokePage = () => {
    const [joke, setJoke] = useState<string | null>(null);
    const [jokeList, setJokeList] = useState<string[]>([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isHovered, setHovered] =useState(false);

    const fetchJoke = async () => {
        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en', {});

            if (response.data && response.data.text) {
                setJoke(response.data.text);
            }

        } catch (error) {
            console.log('Error fetching joke:', error);
        }
    };

    const fetchMultipleJokes = async () => {
        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random/5.json?language=en', {});

            if (response.data && response.data.length > 0) {
                setJokeList(response.data.map((j: Joke) => j.text));
            }

        } catch (error) {
            console.log('Error fetching jokes:', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleHover = () => {
        setHovered(true);
    };

    const handleMouseLeave = ()=>  {
        setHovered(false);
    };

    useEffect(() => {
        if (isDropdownOpen) {
            fetchJoke(); 
        }
    }, [isDropdownOpen]);

    return (
        <div>
            <Button 
                onClick={toggleDropdown}
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
            >GET THE USELESS FACTS OF THE DAY
            </Button>
            {isDropdownOpen && (
                <Container>
                    <p>{joke}</p>
                    <button onClick={closeDropdown}>Close</button>
                </Container>
            )}
            <br />
            {jokeList.length > 0 && (
                <select onChange={(e) => setJoke(jokeList[parseInt(e.target.value, 10)])}>
                    {jokeList.map((joke, index) => (
                        <option key={index} value={index}>{joke}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default JokePage;
