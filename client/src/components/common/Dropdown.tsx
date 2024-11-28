import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props{
    children : React.ReactNode;
    toggleButton : React.ReactNode;
    isOpen? : boolean;
}

const Dropdown = ({children, toggleButton, isOpen=false}: Props) => {
    const [open, setOpen] = useState(isOpen);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const handleDropdwon = (event : MouseEvent)=>{
            if(dropdownRef.current &&
                 !dropdownRef.current.contains(event.target as Node)){
                    setOpen(false);
                 }        
        }

        document.addEventListener("mousedown", handleDropdwon);

        return ()=>{
            document.removeEventListener("mousedown", handleDropdwon)
        }

    },[dropdownRef])
  return (
    <DropdownStyle open={open} ref={dropdownRef}>
        <button className='toggle' 
        onClick={()=>setOpen(!open)}>{toggleButton}
        </button>
        {open && <div className='panel'>{children}</div>}
    </DropdownStyle>
  )
}

interface StyleProps {
    open : boolean;
}

const DropdownStyle = styled.div<StyleProps>`
    position : relative;

    button {
        background : none;
        border : none;
        cursor : pointer;
        outline : none;

        svg { 
            width : 30px;
            height : 30px;
            fill : ${ ({open})=> open ? "white" : ""};
        }
    }

    .panel {
        position : absolute;
        top : 40px;
        right : 0;
        padding : 16px;
        background : #EAEAEA;
        box-shadow : 0 0 10px rgba(0,0,0,0.3);
        border-radius : 20px;
        z-index : 100;
    }
`
export default Dropdown
