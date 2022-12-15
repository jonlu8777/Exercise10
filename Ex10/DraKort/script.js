const btn = document.querySelector('#btn');
const divOut = document.querySelector('#divOut');
const divOutPair = document.querySelector('#divOutPair');

class Card { // man kan lägg till bilden också sen...
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
}
class Pair { // man kan skapa fler klasser, tex triss, fyrtal etc.
  constructor(card1, card2) {
    this.card1 = card1;
    this.card2 = card2;
  }
}
let arr = []; // arrayen med alla kort som kommit tidigare.
              //jag försöker bara paraihop kort efter värdet på dem.
              // men jag lyckas inte för else satserna fungerar inte för mig som tänkt

btn.addEventListener('click', getApi);
function getApi() {
  /*Skriv din kod här*/
  let fullUri = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";
  fetch(fullUri) // jag är medveten om att det finns oändligt många kortlekar här.
    .then(res => res.json())
    .then(data => {

      console.clear(); //rensar consolen varje klick.
      let cardGiv = new Card(data.cards[0].value, data.cards[0].suit)
      if (arr.length !== 0) {  
          arr.forEach(p => {
          if (p.value == cardGiv.value) { //skriv ut alla match
            console.log(`MATCH${p.value}${p.suit},${cardGiv.value}${cardGiv.suit}`);
            arr.splice(p,1); // ta bort matchade kortet från arrayen
           console.log(arr.splice(p,1));
            let pair = new Pair(cardGiv, p) //detta med Pair helt onödigt här, men men

            divOutPair.innerHTML += `<p>${pair.card1.value}${pair.card1.suit} and ${pair.card2.value}${pair.card2.suit} `;

          }
          else {
            console.log(p.value, p.suit); // skriv ut alla korten utom match
            arr.push(cardGiv);
          }
        });
      }
      else if(arr.length ===0)
        arr.push(cardGiv); 
     //ser att arrayen pushar upp en massa par, förstår inte varför.....
     //struligt

      divOut.innerHTML = "";
      divOut.innerHTML +=
        `
        <p>${data.cards[0].value}</p>
        <p>${data.cards[0].suit}</p>
      `;

      let img = document.createElement('img');
      img.setAttribute('src', `${data.cards[0].image}`);
      img.setAttribute('height', '150px');
      img.setAttribute('width', '100px');

      divOut.appendChild(img);

    })
    .catch(err => console.log(err))
}