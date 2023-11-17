// Variable set up
const chatInput = document.getElementById('chat-input')
const chatForm = document.getElementById('chatbot')
const completionsContainer = document.getElementById('completions')
// Function to grab the prompt a user wants to send
let currentUserPrompt = ""
const promptInput = e =>{
    currentUserPrompt = e.currentTarget.value
    console.log(currentUserPrompt)
    }
chatInput.addEventListener('input', promptInput)
// Function to handle chat submission
const chatResponse = e =>{
    e.preventDefault();
    console.log(currentUserPrompt)
    if(!currentUserPrompt){
        console.log("I'm more helpful when you start the conversation.");
        return null
    }
    // making space for ensuing conversation
    let userMessage = document.createElement('p')
    userMessage.innerHTML = `<strong>User: </strong> ${currentUserPrompt}`
    completionsContainer.classList.add('p-1')
    completionsContainer.appendChild(userMessage)
    let newPrompt = new FormData(chatForm);
    fetch("http://127.0.0.1:5000/get/completion", {method: 'post', body: newPrompt })
    .then(res => {
        if(!res.ok){throw new Error('Network response was not ok!')} 
        chatInput.value=""
        currentUserPrompt = ""
        chatInput.placeholder = "Continue the discussion"
        return res.json()
    })
    // Handling returned data
    .then(data =>{
        console.log(data)
        let botMessage = document.createElement('p')
        botMessage.innerHTML =  `<strong>Bot: </strong>${data[0].content}`
        console.log(data[0].content)
        console.log(botMessage)
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
// other features
const scrollTop = document.getElementById('scrollUp')
scrollTop.addEventListener('click', ( ) => {
    console.log('scrolling up')
    window.scrollTo({top:0, behavior: 'smooth'})
})
const scrollDown = document.getElementById('scrollDown')
scrollDown.addEventListener('click', ( ) => {
    console.log('scrolling down')
    window.scrollTo({top:document.body.scrollHeight, behavior: 'smooth'})
})