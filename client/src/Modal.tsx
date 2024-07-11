import React, {FC} from "react";
import {createPortal} from 'react-dom';

interface Props {
  isOpen: boolean
  children: React.ReactNode
}

export const Modal: FC<Props> = ({isOpen, children}) => {
  return createPortal(
    <div className={`fixed ${isOpen ? "" : "hidden"} flex  w-full min-h-screen justify-center bg-white/10 z-50`}>
      <div className={"grid grid-cols-12 items-center xl:container w-full xl:gap-5 gap-4 xl:px-[50px] px-4"}>
        <div className={"xl:col-start-2 xl:col-span-10 col-span-12 bg-neutral-800 xl:p-5 p-4"}>
          { children }
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  )
}