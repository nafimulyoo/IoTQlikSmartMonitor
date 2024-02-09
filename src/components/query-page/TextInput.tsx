'use client'
import { useEffect, useState } from 'react'
import AudioInput from './AudioInput'

const TextInput = ({ setInputQuery }: any) => {

  const [inputText, setInputText] = useState("")
  
  
  useEffect(() => {
    const newInputQuery = {
      type: "text",
      query_input : inputText,
    }; 
    setInputQuery(newInputQuery);
  }, [inputText])
  
  return (
    <div>
      <input type="text" onChange={ (e) => setInputText(e.target.value)} value={ inputText }/>
      <AudioInput setInputText = { setInputText } />
    </div>
  )
}

export default TextInput