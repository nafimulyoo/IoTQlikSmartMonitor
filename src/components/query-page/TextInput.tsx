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
    <div className="relative mx-4 flex items-center justify-center">
      <Input className="w-96 max-w-xs h-full" type="text" onChange={ (e) => setInputText(e.target.value)} value={ inputText }/>
      <AudioInput  setInputText = { setInputText } />
               
      </div>
    </>
  )
}

export default TextInput