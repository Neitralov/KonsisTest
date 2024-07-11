import {IPassword} from "./IPassword.ts";
import {FC, useState} from "react";

interface Props {
  password: IPassword
}

export const Item: FC<Props> = ({password}) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className={`flex justify-between bg-neutral-700 hover:bg-neutral-600 border-neutral-600 border text-neutral-300 px-2 py-1 cursor-pointer`}
      onClick={() => setIsVisible(!isVisible)}>
      <p className={"basis-2/5"}>{password.title}</p>
      <p className={"basis-2/5"}>
        { isVisible ? password.secret : "*".repeat(password.secret.length) }
      </p>
      <p className={"text-end basis-1/5"}>{`${new Date(password.creationDate!).toLocaleTimeString()} ${new Date(password.creationDate!).toLocaleDateString()}`}
      </p>
    </div>
  )
}