import { useState } from "react"

function App() {

  const [inputValue, changeInput] = useState('')
  const [gData, setgData] = useState([])
  const [dataFetched, setDataFetched] = useState(false)

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
      setDataFetched(true);

    }
    catch(error){
      console.error('Error fetching data', error);
    }
  }

  const filteredData = gData.filter(({ starred_at }) => starred_at.startsWith('2023'));

  return (
    <>
    <header>
      <div className="flex justify-center py-2 text-6xl my-4">
        Star<span className="text-[#1D63FF]">G</span>azer
      </div>
    </header>
    <div className="main px-5 sm:px-10 flex justify-center my-4">
      <input type="text" className="p-4 m-6 rounded border-2 border-black" value={inputValue} onChange={handleChange} />
      </div>
      <div className="flex justify-center">
      <button className="bg-black text-white border rounded-lg border-black p-2" onClick={fetchData}>Submit</button>
      </div>
      {dataFetched && (
    <div className="flex justify-center my-6">
    <ul className="border-2 border-black rounded p-4">
      {filteredData.map(({login, starred_at}, index)=>(
        <li key={index}>
          {index + 1} - {login}
        </li>
      ))}
    </ul>
    </div>)}
    
    </>
  )
}

export default App
