import {useState} from "react";

export const useValidationHelper = (defaultErrorMessage: string) => {
  let [isError, setIsError] = useState(true)
  const [isDirty, setIsDirty] = useState(false)
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage)

  const setDefaultErrorMessage = () => {
    setErrorMessage(defaultErrorMessage)
  }

  return { isError, setIsError, isDirty, setIsDirty, errorMessage, setErrorMessage, setDefaultErrorMessage }
}