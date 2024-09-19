/* eslint-env node */
import { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactLoading from "react-loading";
import MarkdownView from 'react-showdown';
// import dotenv from "dotenv";

// import API_KEY from ".env"

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [inp,setInp] = useState("")
  const [recipe,setRecpie] = useState("")
  const[loading,setLoading] = useState(false)
  const genAI = new GoogleGenerativeAI(apiKey); 
  // const 'process.env': JSON.stringify(dotenv.config().parsed
  



  async function getAns(){
    setLoading(true)
    setRecpie("")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Dish name: ${inp}Accurately identify the dish name provided and provide an appropriate recipe consistent with your analysis.`;
    
    const result = await model.generateContent(prompt);
    setRecpie(result.response.text());
    // ans =  await Promise.resolve(converter.makeHtml(show))
    // console.log(ans)
    setLoading(false)
  }
  
  return (
    <>
    <div className='logo'><img src="appLogo.png" alt="" />
    <h1>PlatterPedia – Your encyclopedia of dishes and flavors. </h1>
    <div><label> Enter the recipe you are looking for:</label>
    <input onChange={(e)=>setInp(e.target.value)} type="text" placeholder='Dish' />
      <button onClick={getAns}> Search </button>
      </div>
    </div>
  
    
      {loading&& <div className='loading'><ReactLoading type="spin" color="#ec5b44"
                height={100} width={50} /></div>}
      <MarkdownView markdown={recipe}  />
    </>
  )
}

export default App
