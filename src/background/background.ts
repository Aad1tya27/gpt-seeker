import { HfInference } from "@huggingface/inference";

const inference = new HfInference(import.meta.env.VITE_HUGFACE_TOKEN);

console.log("hey")

// chrome.tabs.onUpdated.addListener((tabId, tab)=>{
//     if(tab.url){
//         console.log(tabId);
//         chrome.runtime.sendMessage(tabId, ())
//     }
// })

chrome.runtime.onMessage.addListener((message: any, _sender: chrome.runtime.MessageSender, sendResponse: (response?: string) => void) => {
    console.log("lesgo ", message);
    async function main(): Promise<void> {
        let result = "";
        for await (const chunk of inference.chatCompletionStream({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [{ role: "user", content: message.message + " explain in not more than 2 sentences" }],
            max_tokens: 500,
        })) {
            result += chunk.choices[0]?.delta?.content || "";
        }
        console.log(result);
        sendResponse(result);
    }
    main();
    return true; // Indicate that we will send a response asynchronously
});
