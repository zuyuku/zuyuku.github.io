const cardText = document.getElementById("textBox");
const cardDiv = document.getElementById("card");
const counter = document.getElementById("counter");
const button = document.getElementById("swapButton");
const qa = document.getElementById("qa");
let card = 0;
let flip = false;
let answerFirst = false;
let data = JSON.parse(localStorage.getItem('cardData'));
if(localStorage.getItem("cardData") == "null") {
  localStorage.clear();
}
if(data==null) {
  loadData();
}

async function loadData() {
  try {
    const response = await fetch('data.json'); // or 'https://example.com'
    data = await response.json(); // Parses the JSON into a JS object
    localStorage.setItem('cardData', JSON.stringify(data));
  } catch (error) {
    console.error("Failed to load JSON:", error);
  }
  for(i=0; i<data['cards'].length;i++)
    addCard(data['cards'][i]['question'], data['cards'][i]['answer']);
  updateText();
}

cardText.addEventListener('command', (event) => {
  if(event.command === '--swapQA') {
    if(answerFirst) {
      answerFirst = false;
      button.textContent = "Display back first";
    } else {
      answerFirst = true;
      button.textContent = "Display front first";
    }
    updateText();
  }
  if(event.command === '--editCards') {
    document.getElementById("viewer").hidden = true;
  }
  if(event.command === '--viewCards') {
    document.getElementById("viewer").hidden = false;
  }
  if(event.command === '--randomize') {
    randomize();
    updateText();
  }
  if(event.command === '--order') {
    resetOrder();
    updateText();
  }
});


document.addEventListener('keydown', (event) => {
  // console.log(`Key pressed: ${event.key}`);
  // Specific key detection
  if(cardCount()==0)
    return;
  if (event.key === 'ArrowLeft') {
    decreaseCard();
  } else if (event.key === 'ArrowRight') {
    increaseCard();
  } else if (event.key === ' ') {
    flipCard();
  } else
    return;
  updateText();
});

function updateText() {
  cardText.style.color = "black";
  cardText.style.fontStyle = "normal";
  let q = flip ? answerFirst ? false:true : answerFirst? true:false;
  if(q)
    qa.textContent = 'Back';
  else
    qa.textContent = 'Front';
  counter.textContent = card + 1 + "/" + cardCount();
  if(!answerFirst)
    cardText.textContent = flip ? getBack(order[card]) : getFront(order[card]);
  else
    cardText.textContent = flip ? getFront(order[card]) : getBack(order[card]);
  if(cardText.textContent=="") {
    cardText.style.color = "grey";
    cardText.style.fontStyle = "italic";
    cardText.textContent = 'This card is blank';
  }
}

function flipCard() {
    flip = flip ? false : true;
    cardDiv.style.animation = cardDiv.style.animation.includes('cardFlip2') ? ".5s cardFlip" : ".5s cardFlip2";
    cardText.style.animation = cardText.style.animation.includes('textHide2') ? ".85s textHide" : ".85s textHide2";
}
function increaseCard() {
  if(card > cardCount()-2)
    return;
  flip = false;
  card++;
  cardText.style.animation = cardText.style.animation.includes('textHide2') ? ".3s textHide" : ".3s textHide2";
  cardDiv.style.animation = cardText.style.animation.includes('textHide2') ? ".3s textHide" : ".3s textHide2";
}
function decreaseCard() {
  if(!card>0)
    return;
  flip = false;
  card--;
  cardText.style.animation = cardText.style.animation.includes('textHide2') ? ".3s textHide" : ".3s textHide2";
  cardDiv.style.animation = cardText.style.animation.includes('textHide2') ? ".3s textHide" : ".3s textHide2";
}
function randomize() {
  let temp = [];
  do {
    let random = Math.round(Math.random()*(order.length-1));
    console.log(random)
    temp.push(order[random]);
    order = removeItem(order, random);
  } while (order.length>0)
  order = temp;
}
function removeItem(list, index) {
  let temp = [];
  for(i=0;i<list.length;i++)
    if(list[i]!=list[index])
      temp.push(list[i]);
  return temp;
}