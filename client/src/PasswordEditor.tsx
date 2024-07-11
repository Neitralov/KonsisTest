import {IPassword} from "./IPassword.ts";
import React, {FC, useEffect, useState} from "react";
import {Button} from "./Button.tsx";
import {httpClient} from "./httpClient.ts";
import {useValidationHelper} from "./useValidationHelper.ts";

interface Props {
  setIsModalOpen: (isOpen: boolean) => void
  passwords: IPassword[]
  setPasswords: React.Dispatch<React.SetStateAction<IPassword[]>>
}

export const PasswordEditor: FC<Props> = ({setIsModalOpen, passwords, setPasswords}) => {
  const [password, setPassword] = useState<IPassword>({ title: "", secret: "", isEmail: false });
  const titleValidator = useValidationHelper("Отсутствует название ресурса")
  const secretValidator = useValidationHelper("Отсутствует пароль")

  useEffect(() => {
    validateTitle()
    validateSecret()
  }, [password]);

  const resetValidationErrors = () => {
    titleValidator.setDefaultErrorMessage()
    titleValidator.setIsDirty(false)
    titleValidator.setIsError(true)

    secretValidator.setDefaultErrorMessage()
    secretValidator.setIsDirty(false)
    secretValidator.setIsError(true)
  }

  const save = () => {
    if (titleValidator.isError || secretValidator.isError) {
      titleValidator.setIsDirty(true)
      secretValidator.setIsDirty(true)

      return
    }

    if (passwords.some(item => item.title.toLowerCase().trim() == password.title.toLowerCase().trim())) {
      alert("Пароль для такого сайта/почты уже записан")
      return
    }

    httpClient.post("/passwords", password).then(response => {
      const newPassword = response.data
      setPasswords([newPassword, ...passwords])
    })

    back()
  }

  const back = () => {
    setIsModalOpen(false)
    setPassword({ title: "", secret: "", isEmail: false })
    resetValidationErrors()
  }

  const validateTitle = () => {
    if (password.title == '') {
      titleValidator.setDefaultErrorMessage()
      titleValidator.setIsError(true)
    } else if (password.isEmail && !password.title.includes('@')) {
      titleValidator.setErrorMessage("Это не является адресом электронной почты")
      titleValidator.setIsError(true)
    } else {
      titleValidator.setErrorMessage('')
      titleValidator.setIsError(false)
    }
  }

  const validateSecret = () => {
    if (password.secret == '') {
      secretValidator.setDefaultErrorMessage()
      secretValidator.setIsError(true)
    } else if (password.secret.length < 8) {
      secretValidator.setErrorMessage("Пароль не должен быть короче 8 символов")
      secretValidator.setIsError(true)
    }
    else {
      secretValidator.setErrorMessage('')
      secretValidator.setIsError(false)
    }
  }

  return(
    <div className={"flex flex-col gap-3 justify-between"}>
      <div className={"flex flex-col gap-1"}>
        <p className={"text-red-600"}>{titleValidator.isDirty ? titleValidator.errorMessage : ''}</p>
        <input
          className={"w-full px-2 py-1.5 text-neutral-300 bg-neutral-700 hover:bg-neutral-600 placeholder-neutral-300 outline-neutral-500"}
          placeholder={"Введите название ресурса..."}
          value={password?.title}
          onBlur={() => titleValidator.setIsDirty(true)}
          onChange={e => setPassword(prevState => ({...prevState, title: e.target.value}))}/>
      </div>

      <div className={"flex flex-col gap-1"}>
        <p className={"text-red-600"}>{secretValidator.isDirty ? secretValidator.errorMessage : ''}</p>
        <input
          className={"w-full px-2 py-1.5 text-neutral-300 bg-neutral-700 hover:bg-neutral-600 placeholder-neutral-300 outline-neutral-500"}
          placeholder={"Введите пароль..."}
          value={password?.secret}
          onBlur={() => secretValidator.setIsDirty(true)}
          onChange={e => setPassword(prevState => ({...prevState, secret: e.target.value}))}/>
      </div>

      <div className={"flex gap-2"}>
        <div>
          <input
            type={"radio"}
            id={"other"}
            name={"isEmail"}
            checked={!password.isEmail}
            onChange={_ => setPassword(prevState => ({...prevState, isEmail: false}))}/>
          <label className={"text-neutral-300"} htmlFor="other"> Сайт</label>
        </div>
        <div>
          <input
            type={"radio"}
            id={"email"}
            name={"isEmail"}
            checked={password.isEmail}
            onChange={_ => setPassword(prevState => ({...prevState, isEmail: true}))}/>
          <label className={"text-neutral-300"} htmlFor="email"> Email</label>
        </div>
      </div>

      <div className={"flex justify-between mt-2"}>
      <Button onClick={back}>
          <span className={"text-base"}>Назад</span>
        </Button>
        <Button onClick={save}>
          <span className={"text-base"}>Сохранить</span>
        </Button>
      </div>
    </div>
  )
}