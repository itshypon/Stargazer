import { useState, useEffect } from "react"

function App() {

  const [inputValue, changeInput] = useState('')
  const [gData, setgData] = useState([])

  const handleChange = (e)=>{
    changeInput(e.target.value)
  }
  
  const fetchData = async() => {
    try{
      const res = await fetch(`https://api.github.com/repos/${inputValue}/stargazers?per_page=100`,{
        headers: {
          'Accept': 'application/vnd.github.v3.star+json'
          }
      });
      if(!res.ok){
        throw new Error("Network response was not ok !")

      }
      const data = await res.json();
      const result = data.map(({ user:{login}, starred_at }) => ({ login, starred_at }));
      setgData(result);

    }
    catch(error){
      console.error('Error fetching data', error);
    }
  }

  const filteredData = gData.filter(({ starred_at }) => starred_at.startsWith('2023-09-13'));

  return (
    <>
    <header>
      <div className="flex justify-center py-2">
        StarGazer
      </div>
    </header>
    <div className="main px-5 sm:px-10">
      <input type="text" className="p-4 m-6 rounded border-2" value={inputValue} onChange={handleChange} />
      <button onClick={fetchData}>Submit</button>
   
    
    <ul className="">
      {filteredData.map(({login, starred_at}, index)=>(
        <li key={index}>
          {index} - {login}
        </li>
      ))}
    </ul>
    </div>
    </>
  )
}

export default App
