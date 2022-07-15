import React, { useState, useEffect, useCallback } from 'react';


const useRightClickMenu = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [showMenu, setShowMenu] = useState(false);


    const handleContextMenu = (e) => {
        e.preventDefault();


        setX(e.PageX);
        setY(e.PageY);
        setShowMenu(true);
      }



    const handleClick = () => {
      showMenu && setShowMenu(false)
    }

    useEffect(() => {
      document.addEventListener("click", handleClick);
      document.addEventListener("contextmenu", handleContextMenu);
      return () => {
        document.addEventListener("click", handleClick);
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    });

    return { x, y, showMenu };
  };

  export default useRightClickMenu
