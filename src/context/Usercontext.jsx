import React, { createContext, useState } from 'react'
import main from '../gemini';
export const datacontext = createContext()

function Usercontext({ children }) {

    let [speaking, setspeaking] = useState(false)

    let [prompt, setPrompt] = useState("Listening...")

    let [response, setResponse] = useState(false)

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-IN"
        window.speechSynthesis.speak(text_speak)
    }

    async function airesponse(prompt) {
        let text = await main(prompt)
        text = text.replace(/google/gi, "Harsh Gupta");
        let newtext = text.split(/\*{1,2}/);
        setPrompt(newtext)
        speak(newtext)
        setResponse(true)
        setTimeout(() => {
            setspeaking(false)
            setResponse(false)
        }, 5000)

    }

    let speech = window.SpeechRecognition || webkitSpeechRecognition

    let recognition = new speech()

    recognition.onresult = (e) => {
        let transcript = e.results[0][0].transcript
        setPrompt(transcript)
        takecommand(transcript.toLowerCase())

    }

    function takecommand(command) {
        if (command.includes("open") && command.includes("youtube")) {
            window.open("https://www.youtube.com/", "_blank")
            speak("opening Youtube")
            setPrompt("Opening Youtube...")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        if (command.includes("open") && command.includes("whatsapp")) {
            window.open("https://www.whatsapp.com/", "_blank")
            speak("opening Whatsapp")
            setPrompt("Opening Whatsapp...")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        if (command.includes("open") && command.includes("google")) {
            window.open("https://www.google.com/", "_blank")
            speak("opening google")
            setPrompt("Opening Google...")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        else {
            airesponse(command)
        }

    }


    let value = {

        recognition,
        speaking,
        setspeaking,
        prompt,
        response
    }

    return (
        <div>
            <datacontext.Provider value={value}>
                {children}
            </datacontext.Provider>
        </div>
    )
}

export default Usercontext