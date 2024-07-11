import {SearchField} from "./SearchField.tsx";
import {Button} from "./Button.tsx";
import {ItemsList} from "./ItemsList.tsx";
import {useEffect, useMemo, useState} from "react";
import {IPassword} from "./IPassword.ts";
import {httpClient} from "./httpClient.ts";
import {Modal} from "./Modal.tsx";
import {PasswordEditor} from "./PasswordEditor.tsx";

export const App = () => {
  const [passwords, setPasswords] = useState<IPassword[]>([]);
  const [filteredPasswords, setFilteredPasswords] = useState<IPassword[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    fetchData().then(x => x)
  }, []);

  const fetchData = async () => {
    const response = await httpClient.get<IPassword[]>('/passwords')
    setPasswords(response.data)
  }

  useMemo(() => {
    setFilteredPasswords([...passwords].filter(passwords => passwords.title.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [passwords, searchQuery])

  return (
    <>
      <div className={"flex flex-col min-h-screen bg-neutral-800"}>
        <main className={"flex flex-col xl:container w-full xl:gap-5 gap-4 xl:px-[50px] px-4"}>
          <div className={"flex xl:gap-5 gap-4 xl:mt-5 mt-4"}>
            <SearchField value={searchQuery} setValue={setSearchQuery} placeholder={"Введите название..."} />
            <Button onClick={() => setIsEditorOpen(true)}>
              <span className={"text-base"}>Добавить</span>
            </Button>
          </div>
            <ItemsList data={filteredPasswords}/>
        </main>
      </div>

      <Modal isOpen={isEditorOpen}>
        <PasswordEditor setIsModalOpen={setIsEditorOpen} passwords={passwords} setPasswords={setPasswords}/>
      </Modal>
    </>
  )
}