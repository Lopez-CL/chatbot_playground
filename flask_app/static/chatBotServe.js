const chatResponse = e =>{
    e.preventDefault();
    let chatBoxInput = document.getElementById('chatbot');
    let newPrompt = new FormData(chatBoxInput);
    // let chatCorrespondences = document.getElementById('completions')
    fetch("http://127.0.0.1:5000/get/completion", {method: 'post', body: newPrompt })
    .then(res => {
        if(!res.ok){throw new Error('Network response was not ok!')} 
        return res.json()
    })
    .then(data =>{
        console.log(data)
    })
    // .then(data =>{
    //     chatCorrespondences.innerHTML = *this will most likely be a map function iterating through list of messages
    // })
    .catch(err => console.log(err))
}