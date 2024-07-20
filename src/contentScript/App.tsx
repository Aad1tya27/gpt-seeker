// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import dotenv from "dotenv"
import { useEffect, useState } from "react"
import { toggleState } from "../store/store";
import { useRecoilValue } from "recoil";
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
  const buttonState = useRecoilValue(toggleState);
  // const bodyRef = useRef(document.body)
  const [inputValue, setInputValue] = useState('');
  const selectedText = useDebounce(inputValue, 500);
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
      }else{
        setOutput("");
      }
    }
    messageToBackground();

  }, [selectedText])

  return !buttonState?
  <></> 
  :
  (
    <>
      <div className='p-2 py-6 border-[2px] border-[#1e1e1e] rounded-lg 
       text-white items-center flex flex-col bg-opacity-90  bg-[#252525] w-[300px] h-[400px]
       top-0 right-0 fixed gap-3' >

        <textarea disabled name='searchContent' className='poppins-regular text-sm h-[60px]  break-words
            overflow-y-auto p-2 px-4 rounded-md bg-[#141414] bg-opacity-95 text-gray-300 border-none' value={inputValue.length ? inputValue : "Select text to search ..."} />

        <div className="output flex gap-4 flex-col items-center justify-center min-h-[75%]">
          <h1  className="text-[16px] text-white">{output?"Search Result:":""}</h1>
          <textarea disabled name='searchContent' className='text-sm h-[80%] poppins-regular break-words
         overflow-y-auto rounded-md bg-transparent text-gray-100 px-2 border-none' value={output} />
        </div>

      </div>
    </>
  )
}

export default App
