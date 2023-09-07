const chatResponse = e =>{
    e.preventDefault();
    let chatBoxInput = document.getElementById('chatbot');
    let newPrompt = new FormData(chatBoxInput);
    let chatCorrespondences = document.getElementById('completions')
    fetch("https://127.0.0.1:5000/get/completion", {method: 'post', body:newPrompt })
    .then(res => res.json())
    // .then(data =>{
    //     chatCorrespondences.innerHTML = *this will most likely be a map function iterating through list of messages
    // })
    .catch(err => console.log(err))
}