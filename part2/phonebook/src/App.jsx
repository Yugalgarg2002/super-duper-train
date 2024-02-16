import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/numbers";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notify">{message}</div>;
};
const Err = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  // console.log(search);

  const addPerson = (event) => {
    event.preventDefault();
    // console.log("cick");
    const pList = persons.map((person) => person.name);
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (pList.includes(newName)) {
      const sPerson = persons.filter((p) => p.name === newName);
      const cPerson = { ...sPerson[0], number: newNumber };
      console.log(cPerson);
      if (
        confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with new one`
        )
      ) {
        setMessage(`${newPerson.name} Updated`);
        setTimeout(() => {
          setMessage(null);
        }, 1000);
        personService.update(cPerson.id, cPerson).then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== cPerson.id ? p : updatedPerson))
          );
          console.log(updatedPerson);
        });
      }
    } else {
      setMessage(`${newPerson.name} Added`);
      setTimeout(() => {
        setMessage(null);
      }, 1000);
      personService.create(newPerson).then((returnedNumber) => {
        setPersons(persons.concat(returnedNumber));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    confirm(`Delete ${person.name}`)
      ? personService
          .delNum(id)
          .then((deleted) => {
            const tpersons = persons.filter((p) => p.id !== deleted.id);

            setPersons(tpersons);
          })
          .catch((error) => {
            console.log(error);
            setErr(`${person.name} already deleted.`);
            setTimeout(() => {
              setErr(null);
            }, 1000);
          })
      : console.log("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Err message={err} />
      <Filter value={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        handlePerson={addPerson}
        handleName={handleNewName}
        handleNumber={handleNewNumber}
        vName={newName}
        vNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
