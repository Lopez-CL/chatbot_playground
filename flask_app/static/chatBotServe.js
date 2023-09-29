// For chat start and serve
const chatInput = document.getElementById('chat-input')
const completionsContainer = document.getElementById('completions')
let currentUserPrompt = ""
const promptInput = e =>{
    currentUserPrompt = e.currentTarget.value}
chatInput.addEventListener('input', promptInput)
const chatResponse = e =>{
    e.preventDefault();
    chatInput.value=""
    console.log(currentUserPrompt)
    if(!currentUserPrompt){
        console.log("I'm more helpful when you start the conversation.")
    }
    let userMessage = document.createElement('p')
    userMessage.innerText = `${currentUserPrompt}`
    let chatForm = document.getElementById('chatbot');
    let newPrompt = new FormData(chatForm);
    completionsContainer.appendChild(userMessage)
    fetch("http://127.0.0.1:5000/get/completion", {method: 'post', body: newPrompt })
    .then(res => {
        if(!res.ok){throw new Error('Network response was not ok!')} 
        return res.json()
    })
    .then(data =>{
        console.log(data)
        for(let i = 0;  i < data.length; i++){ 
            let botMessage = document.createElement('p')
            botMessage.innerText =  `${data[i].content}`
            botMessage.classList.add('text-black')
            console.log(data[i].content)
            console.log(botMessage)
            console.log(`${data[i].content}`)
            completionsContainer.appendChild(botMessage)
        }
    })
    .catch(err => console.log(err))
}
// for starting a new conversation
const clearChatBtn  = document.getElementById('clearBtn')
const clearSession = e =>{
    e.preventDefault();
    fetch("http://127.0.0.1:5000/clear/session")
    .then(res =>{
        if(!res.ok){throw new Error('Network response was not ok')}
        completionsContainer.innerHTML= "";
        chatInput.value=""
    })
}
clearChatBtn.addEventListener('click', clearSession)