import React, { useContext } from 'react'
import aimodal from '/src/assets/aimodal.jpg'
import { CiMicrophoneOn } from "react-icons/ci"
import { datacontext } from './context/Usercontext'
import speakimg from '/src/assets/speak.webp'
import roboimage from '/src/assets/aivoice.gif'
function App() {
  let { recognition, speaking, setspeaking ,prompt,response} = useContext(datacontext)

  return (
    <div className='w-full h-[100vh] bg-black flex flex-col items-center justify-start'>

      <div className='h-[70vh] w-[50vh] overflow-hidden flex items-center justify-center flex-col'>
        <img src={aimodal} alt="aimodal" className='h-[70%]' />

        <span className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-green-600 bg-clip-text text-transparent'>Hello I Am Harsh 2.0</span>

      </div>
      {!speaking ?
        <button className='font-bold text-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600  w-40 h-10 rounded-full flex flex-row items-center justify-center gap-1  shadow-[0_0_20px_4px_rgba(34,211,238,0.6)]' onClick={() => {
          recognition.start()
          setspeaking(true)
        }}>Click Here<CiMicrophoneOn /></button>
        :
        <div className='flex flex-col items-center justify-center'>
          {!response? <img src={speakimg} alt="mic" className='w-[100px]'/>
          :
          <img src={roboimage} alt="roboimage" className='w-[100px]'/>
          }
         
          <p className='bg-gradient-to-r from-blue-400 via-green-400 to-green-600 bg-clip-text text-transparent text-center font-semibold p-9'>{prompt}</p>
        </div>
  
      }
    </div>
  )
}

export default App