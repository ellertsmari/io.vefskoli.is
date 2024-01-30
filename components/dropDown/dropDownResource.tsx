'use client'

//This is a new dropdown component created specifically for the Resources page to handle the client side for the dropdown function.

import React, { useState } from "react";
import Dropdown from "./dropDown";

type Props = {
  options: string[];
  onChange: (selected: string) => void; 
};


const DropdownResources = ({ options, onChange }:Props) => {
  const [selectedOption, setSelectedOption] = useState('ALL VIDEOS'); // initializes selected state to the first option
  const handleSelect = (option:string) => {
    setSelectedOption(option);
    onChange(option);
  }
  
  return (
    <Dropdown options={options} selected={selectedOption} setSelected={handleSelect} />
  );
};

export default DropdownResources;


/*
options is defined as an array of topics from your meetings data, 
and it’s passed as a prop to the DropdownResources component. 
If options is undefined in your DropdownResources component, it means that it’s either not passed from the parent component 
or it’s undefined in the parent component.*/