const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const textArea =document.querySelector('#textArea');


btn.addEventListener('click', getApi);

function getApi() {
    
    let fullUri = `https://www.swapi.tech/api/people/?name=${input.value}`; 

    /*Skriv din kod här*/
    fetch(fullUri)
    .then(res =>res.json())
    .then(data =>
     {/*Och här*/

     
      console.log(data.result[0].properties.height)
    
    textArea.textContent +=
    ` 
    Name:${data.result[0].properties.name}  
    Height:${data.result[0].properties.height}  
    Description:${data.result[0].description}  
    Eye color:${data.result[0].properties.eye_color}  
    Hair color:${data.result[0].properties.hair_color}  
    Gender:${data.result[0].properties.gender}  
    `

    
})
     .catch(err => console.log(err))
}