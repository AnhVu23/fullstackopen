import React, { useState } from "react"

const Filter = ({ search, onSearchChange }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={onSearchChange} />
    </div>
  )
}

const PersonForm = ({
  onFormSubmit,
  newName,
  newPhoneNum,
  onNewNameChange,
  onNewPhoneChange,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <h2>Add a new</h2>
      <div>
        name: <input value={newName} onChange={onNewNameChange} />
      </div>
      <div>
        number: <input value={newPhoneNum} onChange={onNewPhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, search }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.phoneNum}
      </p>
    ))
    
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNum: "040-123456" },])
  const [newName, setNewName] = useState("")
  const [newPhoneNum, setNewPhoneNum] = useState("")
  const [search, setSearch] = useState("")

  const onFormSubmit = (e) => {
    e.preventDefault()
    const foundExistPerson =
      persons.findIndex((person) => person.name === newName) > -1
    if (foundExistPerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        phoneNum: newPhoneNum,
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewPhoneNum("")
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      />
      <PersonForm
        onFormSubmit={onFormSubmit}
        newName={newName}
        newPhoneNum={newPhoneNum}
        onNewNameChange={(e) => setNewName(e.target.value)}
        onNewPhoneChange={(e) => setNewPhoneNum(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons search={search} persons={persons} />
    </div>
  )
}

export default App
