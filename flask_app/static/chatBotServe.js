// For chat start and serving responses
const chatInput = document.getElementById('chat-input')
const chatForm = document.getElementById('chatbot')
const completionsContainer = document.getElementById('completions')
let currentUserPrompt = ""
const promptInput = e =>{
    currentUserPrompt = e.currentTarget.value
    console.log(currentUserPrompt)
    }
chatInput.addEventListener('input', promptInput)
const chatResponse = e =>{
    e.preventDefault();
    console.log(currentUserPrompt)
    if(!currentUserPrompt){
        console.log("I'm more helpful when you start the conversation.");
        return null
    }
    let userMessage = document.createElement('p')
    userMessage.innerText = `${currentUserPrompt}`
    completionsContainer.appendChild(userMessage)
    let newPrompt = new FormData(chatForm);
    fetch("http://127.0.0.1:5000/get/completion", {method: 'post', body: newPrompt })
    .then(res => {
        if(!res.ok){throw new Error('Network response was not ok!')} 
        chatInput.value=""
        currentUserPrompt = ""
        return res.json()
    })
    .then(data =>{
        console.log(data)
        let botMessage = document.createElement('p')
        botMessage.innerText =  `${data[0].content}`
        botMessage.classList.add('text-black')
        console.log(data[0].content)
        console.log(botMessage)
        console.log(`${data[0].content}`)
        completionsContainer.appendChild(botMessage)
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
        currentUserPrompt = ""
    })
}
clearChatBtn.addEventListener('click', clearSession)