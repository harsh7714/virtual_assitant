import React, { createContext, useState, useEffect, useRef } from 'react'
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
        text_speak.lang = 'hi-IN'
        window.speechSynthesis.speak(text_speak)
    }

    // speak greeting once when the provider mounts (guarded by ref)
    const greeted = useRef(false)
    useEffect(() => {
        try {
            if (!greeted.current) {
                speak('How can I help you')
                greeted.current = true
            }
        } catch (e) {
            console.warn('greeting failed', e)
        }
    }, [])

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
            setPrompt("Listening...")
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
            window.open("https://wa.me/", "_blank")
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
        if (command.includes("open")&&command.includes("linkedin")) {
            window.open("https://www.linkedin.com/in/harsh-gupta-589826289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", "_blank")
            speak("opening linkedin")
            setPrompt("Opening Linkedin ...")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
         if (command.includes("open")&&command.includes("instagram")) {
            window.open("https://www.instagram.com/?deoia=1", "_blank")
            speak("opening instagram ")
            setPrompt("Opening Instagram...")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        
        else {
            airesponse(command)
        }

    }

    function stopSpeaking() {
        try {
            if (window && window.speechSynthesis && typeof window.speechSynthesis.cancel === 'function') {
                window.speechSynthesis.cancel()
            }
        } catch (e) {
            console.warn('speech cancel failed', e)
        }
        // update state
        setspeaking(false)
        setResponse(false)
        setPrompt("Listening...")
    }


    let value = {

        recognition,
        speaking,
        setspeaking,
        prompt,
        response,
        stopSpeaking,
        speak
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