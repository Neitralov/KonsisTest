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
    console.log(password.isEmail)
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

    if (passwords.some(item => item.title.toLowerCase() == password.title.toLowerCase())) {
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
    <div className={"flex flex-col xl:gap-5 gap-4 justify-between"}>
      <p className={"text-red-600"}>{titleValidator.isDirty ? titleValidator.errorMessage : ''}</p>
      <input
        className={"bg-gray-200"}
        placeholder={"Введите название..."}
        value={password?.title}
        onBlur={() => titleValidator.setIsDirty(true)}
        onChange={e => setPassword(prevState => ({...prevState, title: e.target.value}))}/>
      <p className={"text-red-600"}>{secretValidator.isDirty ? secretValidator.errorMessage : ''}</p>
      <input
        className={"bg-gray-200"}
        placeholder={"Введите пароль..."}
        value={password?.secret}
        onBlur={() => secretValidator.setIsDirty(true)}
        onChange={e => setPassword(prevState => ({...prevState, secret: e.target.value}))}/>
      <div>
        <input
          type={"radio"}
          id={"other"}
          name={"isEmail"}
          checked={!password.isEmail}
          onChange={_ => setPassword(prevState => ({...prevState, isEmail: false}))}/>
        <label htmlFor="other"> Сайт</label><br/>
        <input
          type={"radio"}
          id={"email"}
          name={"isEmail"}
          checked={password.isEmail}
          onChange={_ => setPassword(prevState => ({...prevState, isEmail: true}))}/>
        <label htmlFor="email"> Email</label>
      </div>
      <div className={"flex justify-between"}>
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