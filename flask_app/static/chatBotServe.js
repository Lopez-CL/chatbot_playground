const chatInput = document.getElementById('chat-input')
let currentUserPrompt = ""
const promptInput = e =>{
    currentUserPrompt = e.currentTarget.value}
chatInput.addEventListener('input', promptInput)
const chatResponse = e =>{
    e.preventDefault();
    let completionsContainer = document.getElementById('completions')
    console.log(currentUserPrompt)
    if(!currentUserPrompt){
        console.log("I'm more helpful when you start the conversation.")
    }
    let chatForm = document.getElementById('chatbot');
    let newPrompt = new FormData(chatForm);
    let userMessage = document.createElement('p')
    userMessage.innerText = `${currentUserPrompt}`
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