import React, { useState, useEffect } from 'react'
import * as phoneBookService from './services/phoneBook'
import './App.css'
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

const Persons = ({ persons, search, onDeletePerson }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((person) => (
      <div className={'flex'}>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        <button onClick={() => onDeletePerson(person)}>
          <span>delete</span>
        </button>
      </div>
    ))

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPhoneBook()
  }, [])

  const getPhoneBook = () => {
    phoneBookService
      .getAll()
      .then((persons) => {
        setPersons(persons)
      })
      .catch((e) => {
        console.error(e)
      })
  }
  const onFormSubmit = (e) => {
    e.preventDefault()
    const foundExistPerson =
      persons.findIndex((person) => person.name === newName) > -1
    if (foundExistPerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNum,
      }
      phoneBookService
        .createOne(newPerson)
        .then((res) => {
          getPhoneBook()
        })
        .catch((e) => {
          console.error(e)
        })
      setNewName('')
      setNewPhoneNum('')
    }
  }

  const onDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneBookService
        .deleteOne(person.id)
        .then((res) => {
          getPhoneBook()
        })
        .catch((e) => console.error(e))
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
      <Persons
        search={search}
        persons={persons}
        onDeletePerson={onDeletePerson}
      />
    </div>
  )
}

export default App
