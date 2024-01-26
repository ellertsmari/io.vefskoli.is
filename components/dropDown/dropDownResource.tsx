'use client'

//This is a new dropdown component created specifically for the Resources page to handle the client side for the dropdown function.

import React, { useState } from "react";
import Dropdown from "./dropDown";

const DropdownResources = ({ options }) => {
  const [selected, setSelected] = useState(options[0]); // initializes selected state to the first option

  return (
    <Dropdown options={options} selected={selected} setSelected={setSelected} />
  );
};

export default DropdownResources;
