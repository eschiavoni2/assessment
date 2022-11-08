// two countries, two cities
// correct = blue or first click = blue
// incorrect = red
// correct pair disappear
// if both wrong reset to plain background
import React, { useState } from 'react';
import './App.css';



function Button({ datum, id, handleClick }) {
  const datumClass = datum.stat ? 'active' + datum.stat : '';
  return (
 
    <button className={'button' + datumClass} type='button' id={datum.id} onClick={() => handleClick(id)}>
      {datum.countryInfo}
    </button>
    
  
  );
}

function CountryCapitalGame() {
  const [data, setData] = useState([
    { id: 1, countryInfo: "Germany", stat: '' },
    { id: 1, countryInfo: "Berlin", stat: '' },
    { id: 2, countryInfo: "Azerbaijan", stat: '' },
    { id: 2, countryInfo: "Baku", stat: '' }
  ].sort(() => Math.random() - 0.5));

  // new state for previously selected id 
  const [previous, setPrev] = useState(-1)

  function check(current) {
    if (data[current].id === data[previous].id) {
      data[current].stat = 'correct'
      data[previous].stat = 'correct'
      setData([...data])
      setPrev(-1)
      setTimeout(() => {
        if (data[current].id === data[previous].id) {
          data[current].stat = 'hide'
          data[previous].stat = 'hide'
          setData([...data])
          setPrev(-1)
          return alert('Congratulations!')
        }
      }, 500)
    }
    else {
      data[current].stat = 'wrong'
      data[previous].stat = 'wrong'
      setData([...data])
      setTimeout(() => {
        data[current].stat = ''
        data[previous].stat = ''
        setData([...data])
        setPrev(-1)
      },1000)
    }
  }
  
  // id of data
  function handleClick(id) {
    if (previous === -1) {
      data[id].stat = 'active'
      console.log(data[id].stat)
      setData([...data])
      setPrev(id)
    } else {
      check(id)
    }
  }

  return (
    <div id="root">
      {data.map((datum, index) => (
        <Button key={ index } datum={ datum } id={ index } handleClick={ handleClick }/>
      ))}
    </div>
  );
}

export default CountryCapitalGame;