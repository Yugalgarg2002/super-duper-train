import { useState, useEffect } from "react";
import axios from "axios";

const Content = ({ countries, detail }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length > 1) {
    return <pre>{JSON.stringify(countries, null, 1)}</pre>;
  }
  if (countries.length == 1) {
    return (
      <>
        <h1>{detail.name}</h1>
        Capital:
        {detail.capital.map((c) => (
          <span key={c}> {c}</span>
        ))}
        <br />
        Area: {detail.area}
        <h2>Languages: </h2>
        <ul>
          {Object.values(detail.lang).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img src={detail.flag.png} alt={detail.flag.alt} />
      </>
    );
  }
};

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState([]);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const country = response.data.map((c) => c.name.common);
        // console.log(country);
        setCountries(country);
      });
  }, []);

  useEffect(() => {
    const l = countries.filter(
      (c) => c.toLowerCase().match(value.toLowerCase()) !== null
    );
    // console.log(l);
    // console.log(countries);
    if (l.length == 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${l[0]}`)
        .then((response) => {
          const t = {};
          t["name"] = response.data.name.common;
          t["capital"] = response.data.capital;
          t["area"] = response.data.area;
          t["lang"] = response.data.languages;
          t["flag"] = response.data.flags;

          setDetail(t);

          // console.log(response.data);
          console.log(t);
        });
    }
    if (value !== "") {
      setShow(l);
    }
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      Find Countries: <input value={value} onChange={handleChange} />
      <Content countries={show} detail={detail} />
    </div>
  );
};

export default App;
