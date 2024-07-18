// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import dotenv from "dotenv"
import { useEffect, useState } from "react"

// dotenv.config()
function useDebounce(input: string, n: number): string {

  const [debounce, setDebounce] = useState<string>(input)

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounce(input)
    }, n);

    return () => {
      clearTimeout(t);
    }
  }, [input, n]);

  return debounce;

}

function App() {
  // const bodyRef = useRef(document.body)
  const [inputValue, setInputValue] = useState('');
  const selectedText = useDebounce(inputValue, 1000);
  const [output, setOutput] = useState<string>("");
  useEffect(() => {

    document.addEventListener("selectionchange", () => {
      const sel = document.getSelection()?.toString();
      // console.log(bodyRef.current, sel)
      setInputValue((): string => {
        if (sel) return sel;
        else return "";
      })
      // console.log(document.onselectionchange?.toString)
    })

  }, [])

  useEffect(() => {
    // console.log(import.meta.env.VITE_OPEN_API_KEY);
    // chrome.tabs.get((tabId), ()=>{

    // })
    async function messageToBackground() {
      if (selectedText.length) {
        chrome.runtime.sendMessage({
          type: "UPDATED_SEARCH",
          message: selectedText
        }, (response: string) => {
          console.log(response);
          setOutput(response)
        })
      }
    }
    messageToBackground();

  }, [selectedText])

  return (
    <>
      <div className='justify-around border-[5px] border-slate-900 rounded-lg 
       text-white items-center flex flex-col bg-opacity-40 bg-gradient-to-b from-slate-800 to-slate-700 w-[300px] h-[400px]
       top-0 right-0 fixed py-2' >

        <div className="input flex flex-col items-center justify-center">
          <h1 className="text-[16px] leading-6 text-white text-center">Selected Text:</h1>
          <textarea disabled name='searchContent' className=' text-sm h-[100px] text-center break-words
            overflow-y-auto rounded-md bg-opacity-50 bg-white  text-black border-[1px] border-slate-500' value={inputValue} />
        </div>

        <div className="output flex flex-col items-center justify-center">
          <h1 className="text-[16px] text-white text-center">Search Result:</h1>
          <textarea disabled name='searchContent' className='text-sm h-[100px] text-center break-words
         overflow-y-auto rounded-md bg-opacity-50 bg-white text-black border-[1px] border-slate-500' value={output} />
        </div>

      </div>
    </>
  )
}

export default App
