// Variable set up
const originalWindowHeight = window.innerHeight;
const chatInput = document.getElementById('chat-input')
const chatForm = document.getElementById('chatbot')
const completionsContainer = document.getElementById('completions')
// Function to grab the prompt a user wants to send
let currentUserPrompt = ""
const promptInput = e =>{
    currentUserPrompt = e.currentTarget.value
    }
chatInput.addEventListener('input', promptInput)
// Function to handle chat submission
const chatResponse = e =>{
    e.preventDefault();
    console.log(currentUserPrompt)
    if(!currentUserPrompt){
        // I may want to change this eventually
        console.log("I'm more helpful when you start the conversation.");
        return null
    }
    // making space for ensuing conversation
    let userMessage = document.createElement('p')
    userMessage.innerHTML = `<strong>User: </strong> ${currentUserPrompt}`
    completionsContainer.classList.add('p-1')
    completionsContainer.appendChild(userMessage)
    let newPrompt = new FormData(chatForm);
    if(completionsContainer.clientHeight > originalWindowHeight){
        scrollTopButton.style.display = "inline-flex"
        scrollDownButton.style.display = "inline-flex"
    }else{
        scrollTopButton.style.display = "none"
        scrollDownButton.style.display = "none"
    }
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
        // consider how you may want to handle the case of an empty array.
        let botMessage = document.createElement('p')
        completionsContainer.appendChild(botMessage)
        botMessage.innerHTML = "Bot: "
        let idx = 0
        const writeBotResponse = setInterval(()=>{
            botMessage.innerHTML += `${data[idx]} `
            idx++
            if(idx === data.length){
                clearInterval(writeBotResponse)
            }
        }, 350)
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
        scrollTopButton.style.display = "none"
        scrollDownButton.style.display = "none"
    })
}
clearChatBtn.addEventListener('click', clearSession)
// autoscroll features
const scrollTopButton = document.getElementById('scrollUp')
scrollTopButton.addEventListener('click', ( ) => {
    console.log('scrolling up')
    window.scrollTo({top:0, behavior: 'smooth'})
})
const scrollDownButton = document.getElementById('scrollDown')
scrollDownButton.addEventListener('click', ( ) => {
    console.log('scrolling down')
    window.scrollTo({top:document.body.scrollHeight, behavior: 'smooth'})
})
if(completionsContainer.clientHeight > originalWindowHeight){
    scrollTopButton.style.display = "inline-flex"
    scrollDownButton.style.display = "inline-flex"
}else{
    scrollTopButton.style.display = "none"
    scrollDownButton.style.display = "none"
}