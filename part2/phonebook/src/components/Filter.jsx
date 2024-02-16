const Filter = (props) => (
  <p>
    Filter shown with{" "}
    <input value={props.search} onChange={props.handleSearch} />
  </p>
);

export default Filter;
