import React, { useState } from "react";

export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return { isOpen, toggle };
};
