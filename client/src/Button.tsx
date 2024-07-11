import React, {FC} from "react";

interface Props {
  onClick: () => void
  children: React.ReactNode
}

export const Button: FC<Props> = ({onClick, children}) => {
  return (
    <button
      className={"flex justify-center items-center h-fit gap-0.5 bg-neutral-700 hover:bg-neutral-600 border-neutral-600 border text-neutral-300 px-4 py-[7px] outline-neutral-500 cursor-pointer select-none"}
      onClick={onClick}>
      { children }
    </button>
  )
}