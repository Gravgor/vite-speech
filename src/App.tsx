import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
 const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)

  const handleListen = () => {
    setIsListening(true)
      if(typeof window !== 'undefined') {
        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'pl-PL'
        recognition.start()
  
        recognition.onresult = (e: any) => {
          const transcript = Array.from(e.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('')
  
          setTranscript(transcript)
        }
  
        recognition.onend = () => {
          setIsListening(false)
        }
      }
   
  }


  return (
    <div className="container">
      <div className="header">
        <h1 className="title">React Speech Recognition</h1>
      </div>
      <div className="content">
        <div className="logo">
          <img src={reactLogo} alt="React Logo" />
        </div>
        <div className="transcript">
          <p>
            {transcript || 'Start speaking...'}
          </p>
        </div>
        <div className="button">
          <button onClick={handleListen} disabled={isListening}>
            {isListening ? 'Listening...' : 'Start'}
          </button>
          <button onClick={() => setIsListening(false)}>
            Stop
          </button>
          <button onClick={() => setTranscript('')}>
            Clear
          </button>
        </div>
      </div>
      <div className="coontent2">
        <div className="header">
          <h1 className="title">openAI answear</h1>
        </div>
        <div className="transcript">
          <p>
            
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
