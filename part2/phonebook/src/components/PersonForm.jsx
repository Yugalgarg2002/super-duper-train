const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.handlePerson}>
        <div>
          <p>
            Name: <input onChange={props.handleName} value={props.vName} />
          </p>
          <p>
            Number:{" "}
            <input value={props.vNumber} onChange={props.handleNumber} />
          </p>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
