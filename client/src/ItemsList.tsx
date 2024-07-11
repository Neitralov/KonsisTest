import {IPassword} from "./IPassword.ts";
import {FC} from "react";
import {Item} from "./Item.tsx";

interface Props {
  data: IPassword[]
}

export const ItemsList: FC<Props> = ({data}) => {
  return(
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between text-gray-500 px-2"}>
        <p className={"basis-2/5"}>Название ресурса</p>
        <p className={"basis-2/5"}>Пароль</p>
        <p className={"text-end basis-1/5"}>Дата создания</p>
      </div>
      { data.map(password => <Item key={password.id} password={password} />) }
    </div>
  )
}