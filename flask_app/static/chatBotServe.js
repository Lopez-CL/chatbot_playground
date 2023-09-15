const chatResponse = e =>{
    e.preventDefault();
    let chatBoxInput = document.getElementById('chatbot');
    let newPrompt = new FormData(chatBoxInput);
    let completionsContainer = document.getElementById('completions')
    // let chatCorrespondences = document.getElementById('completions')
    fetch("http://127.0.0.1:5000/get/completion", {method: 'post', body: newPrompt })
    .then(res => {
        if(!res.ok){throw new Error('Network response was not ok!')} 
        return res.json()
    })
    .then(data =>{
        console.log(data)
        // goal in line below is to only add the most recent two lines
        for(let i = 0;  i < data.length; i++){ 
            let message = document.createElement('p')
            message.innerText =  `${data[i].content}`
            message.classList.add('text-black')
            console.log(data[i].content)
            console.log(message)
            console.log(`${data[i].content}`)
            completionsContainer.appendChild(message)
        }
    })
    .catch(err => console.log(err))
}