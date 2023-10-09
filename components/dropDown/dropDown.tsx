"use client";

import React, { useState } from "react";
import { AnimatePresence} from "framer-motion";
import {DropdownContainer, DropdownButton, DropdownContent, ArrowImage} from "./styles"
import Image from "next/image";
import dropdownArrow from "../../public/dropdownArrow.svg";


type Props = {
  options: string[];
  selected: string;
  setSelected: (s: string) => void;
};

const Dropdown = ({ options, selected, setSelected }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const slideAnimation = {
    hidden: { opacity: 0, y: -200 },
    vissible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -300 },
  };

  const arrowAnimation = {
    closed: { rotate: 180 },
    open: { rotate: 0 },
  };


  const onSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <DropdownContainer onClick={() => setIsOpen(!isOpen)}>
      <DropdownButton>
        {selected}
        <AnimatePresence>
            <ArrowImage
              variants={arrowAnimation}
              initial={"closed"}
              animate={isOpen ? "open" : "closed"}
            >
              <Image alt="dropdownArrow" src={dropdownArrow}></Image>
            </ArrowImage>
        </AnimatePresence>
      </DropdownButton>
      <AnimatePresence>
        {isOpen && (
          <DropdownContent
            initial="hidden"
            animate="vissible"
            exit="exit"
            variants={slideAnimation}
          >
            {options.map((option, index) => (
              <a key={index} onClick={() => onSelect(option)}>
                {option}
              </a>
            ))}
          </DropdownContent>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
};

export default Dropdown;
