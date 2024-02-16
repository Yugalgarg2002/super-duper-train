const Persons = ({ persons, search, deletePerson }) => {
  return (
    <>
      <div>
        {search === ""
          ? persons.map((person) => (
              <p key={person.name}>
                {person.name} {person.number}{" "}
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </p>
            ))
          : persons
              .filter((person) =>
                person.name.toLowerCase().match(search.toLowerCase())
              )
              .map((person) => (
                <p key={person.name}>
                  {person.name} {person.number}{" "}
                  <button onClick={() => deletePerson(person.id)}>
                    Delete
                  </button>
                </p>
              ))}
      </div>
    </>
  );
};

export default Persons;
