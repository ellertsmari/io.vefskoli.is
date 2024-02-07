import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../person-style";
import Image from "next/image";
import dropdownArrow from "/public/dropdownArrow.svg";
import { motion } from "framer-motion";
import { ArrowImage } from "../person-style";

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

const arrowAnimation = {
    closed: {rotate: 180},
    open: {rotate:0},
}

const JokePage = () => {
    const [joke, setJoke] = useState<string | null>(null);
    const [jokeList, setJokeList] = useState<string[]>([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isHovered, setHovered] = useState(false);

    const fetchJoke = async () => {
        try {
            const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
            const data = await response.json();

            if (data && data.text) {
                setJoke(data.text);
            }

        } catch (error) {
            console.log('Error fetching joke:', error);
        }
    };


const ArrowImage = motion(styled.div`
    margin-left: auto;
    `);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleHover = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
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
      >
        GET THE USELESS FACTS OF THE DAY
        <ArrowImage
          variants={arrowAnimation}
          initial="closed"
          animate={isDropdownOpen ? "open" : "closed"}
        >
          <Image alt="dropdownArrow" src={dropdownArrow} />
        </ArrowImage>
      </Button>
            {isDropdownOpen && (
                <Container>
                    <p>{joke}</p>
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
