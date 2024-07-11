import React, {FC} from "react";

interface Props {
  placeholder: string
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchField: FC<Props> = ({placeholder, value, setValue}) => {
  return (
    <div className={"relative w-full"}>
      <input
        className={"w-full h-10 text-neutral-300 bg-neutral-700 border-neutral-600 border px-5 outline-neutral-500 placeholder-neutral-300"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}