import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RecoilRoot } from "recoil"
// (async ()=>{

// })()

const root = document.createElement("div");
root.id = "chatgpt-content-script-root";
root.style.position = "fixed";
root.style.top = "0";
root.style.right = "0";
root.style.width = "200px"; // Adjust width as needed
root.style.height = "300px"; // Adjust height as needed
root.style.zIndex = "9999"; // Ensure it is on top of other elements
root.style.backgroundColor = "transparent"; // Ensure visibility against the background
// document.body.style.width = "100vw";
// root.textContent = "lesgo";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);