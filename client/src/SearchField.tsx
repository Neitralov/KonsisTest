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
        className={"w-full xl:h-10 h-9 bg-background xl:text-base text-sm px-5 rounded"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}