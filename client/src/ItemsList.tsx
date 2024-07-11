import {IPassword} from "./IPassword.ts";
import {FC} from "react";
import {Item} from "./Item.tsx";

interface Props {
  data: IPassword[]
}

export const ItemsList: FC<Props> = ({data}) => {
  return(
    <>
      {data.length != 0 ?
        <div className={"flex flex-col gap-1.5"}>
          <div className={"flex justify-between text-neutral-400"}>
            <p className={"basis-2/5"}>Название ресурса</p>
            <p className={"basis-2/5"}>Пароль</p>
            <p className={"text-end basis-1/5"}>Дата создания</p>
          </div>
          {data.map(password => <Item key={password.id} password={password}/>)}
        </div> :
        <p className={"flex justify-center text-neutral-400"}>Тут ничего нет :(</p>
      }
    </>

  )
}