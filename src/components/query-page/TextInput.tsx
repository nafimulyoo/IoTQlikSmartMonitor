'use client'
import { useEffect, useState } from 'react'
import AudioInput from './AudioInput'
import { Input } from '@/components/ui/input'

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
    <>
      <Input type="text" onChange={ (e) => setInputText(e.target.value)} value={ inputText }/>
      <AudioInput setInputText = { setInputText } />
    </>
  )
}

export default TextInput