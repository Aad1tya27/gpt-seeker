import { useRecoilState } from "recoil"
import { toggleState } from "../store/store"
function App() {
  // const [count, setCount] = useState(0)
  const [buttonState, setButtonState] = useRecoilState(toggleState)
  return (
    <>
      <div className='bg-opacity-95 poppins-medium gap-2 text-md bg-[#252525] h-[125px] w-[300px] flex flex-col justify-center items-center '>
        <h1 className='text-white'>Enable or Disable Extension</h1>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={buttonState} className="sr-only peer" onClick={() => {
            setButtonState((state) => !state)
            console.log(buttonState);
          }} />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

        </label>
        <h1 className='text-white'>Select Text to get meaning.</h1>
        {/* <textarea name='searchContent' className='w-[80%] h-[60%] text-md text-center break-words
         overflow-y-auto rounded-md  text-black' /> */}
      </div>
    </>
  )
}

export default App
