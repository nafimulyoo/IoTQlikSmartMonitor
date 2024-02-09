import { useWhisper } from '@chengsokdara/use-whisper'

const AudioInput = ({ setInputText }: any) => {
  const onTranscribe = async (blob: Blob) => {
    const base64 = await new Promise<string | ArrayBuffer | null>(
      (resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      }
    )
    const body = JSON.stringify({ file: base64, model: 'whisper-1' })
    const headers = { 'Content-Type': 'application/json' }
    const response = await fetch('api/whisper', { method: 'POST', body, headers })
    const { text } = await response.json()
    // you must return result from your server in Transcript format
    console.log(text)
    setInputText(text)
    return {
      blob,
      text,
    }
  }

  const {
    startRecording,
    stopRecording,
  } = useWhisper({
    onTranscribe
  })

  return (
    <>
      <button onMouseDown={startRecording} onMouseUp={stopRecording}>
        Record
      </button>
    </>
  )
}
export default AudioInput