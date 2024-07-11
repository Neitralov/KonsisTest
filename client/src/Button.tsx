import React, {FC} from "react";

interface Props {
  onClick: () => void
  children: React.ReactNode
}

export const Button: FC<Props> = ({onClick, children}) => {
  return (
    <button
      className={"flex justify-center items-center h-fit gap-0.5 bg-white hover:bg-gray-100 text-xs px-3 py-1.5 rounded shadow-sm cursor-pointer select-none"}
      onClick={onClick}>
      { children }
    </button>
  )
}