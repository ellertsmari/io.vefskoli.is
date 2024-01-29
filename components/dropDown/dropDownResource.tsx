'use client'

//This is a new dropdown component created specifically for the Resources page to handle the client side for the dropdown function.

import React, { useState } from "react";
import Dropdown from "./dropDown";

const DropdownResources = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]); // initializes selected state to the first option

  return (
    <Dropdown options={options} selected={selectedOption} setSelected={setSelectedOption} />
  );
};

export default DropdownResources;


/*
options is defined as an array of topics from your meetings data, 
and it’s passed as a prop to the DropdownResources component. 
If options is undefined in your DropdownResources component, it means that it’s either not passed from the parent component 
or it’s undefined in the parent component.*/