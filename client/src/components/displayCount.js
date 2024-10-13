

async function incrementCount(){
    try{
        const response = await fetch(process.env.API, {
            method: 'POST', 
            headers: {
               'Content-Type': 'application/json'
            }
        });
        const data = await response.json(); 
        return data.count;
    } catch (error){
        console.error('Increment failed: ', error)
    }
}

async function displayCount(){
    const data = await incrementCount(); 
    const counterDisplay = document.getElementById('counter'); 
    counterDisplay.innerText = data; 
}

export { displayCount }
