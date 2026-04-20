const editor = document.getElementById("editor");
const grid = document.getElementById("grid");
const addCardButton = document.getElementById('addCardButton');
const swapButton = document.getElementById('swapButton');
const randomOrderButton = document.getElementById('randomizeButton');
let uniqueIdCounter = 0;
let order = [];

editor.childNodes.forEach(element => {
    element.hidden = true;
});

swapButton.addEventListener('keydown', (event) => {
  if(event.code === 'Space')
    event.preventDefault();
});
randomOrderButton.addEventListener('keydown', (event) => {
  if(event.code === 'Space')
    event.preventDefault();
});

cardText.addEventListener('command', (event) => {
  if(event.command === '--editCards') {
    editor.hidden = false;
    editor.childNodes.forEach(element => {
        element.hidden = false;
    });
  }
  if(event.command === '--viewCards') {
    editor.hidden = true;
    editor.childNodes.forEach(element => {
        element.hidden = true;
    });
    updateText();
  }
  if(event.command === '--save') {
    localStorage.clear();
    let newData = new Object();
    newData['cards'] = [];
    for(i=0; i<cardCount();i++) {
      newData['cards'][i] = {};
      newData['cards'][i]['question'] = getFront(i);
      newData['cards'][i]['answer'] = getBack(i);
      console.log(newData);
    }
    localStorage.setItem('cardData', JSON.stringify(newData));
  }
  if(event.command === '--reset') {
    clearCards();
    loadData();
  }
});

grid.addEventListener('command', (event) => {
  if(event.command == '--addCard'){
    addCard();
  }
  let commandString = event.command;
  if(commandString.includes('--removeCard')) {
    removeCard(getIndex(commandString));
  }
});

function getIndex(id) {
  let children = grid.children;
  let index;
  for(i=0;i<children.length; i++) {
    if(children[i].command == id){
      index = i;
      break;
    }
  }
  return index;
}

function removeCard(index) {
  index = index-2;
  grid.removeChild(grid.children[index]);
  grid.removeChild(grid.children[index]);
  grid.removeChild(grid.children[index]);
}

function addCard() {
  console.log({question:'temp',answer:'temp'});
  data['cards'].push({'question':'temp','answer':'temp'});
  let div1 = document.createElement('div');
  div1.appendChild(document.createElement('textarea'))
  let div2 = document.createElement('div');
  div2.appendChild(document.createElement('textarea'))
  grid.appendChild(div1);
  grid.appendChild(div2);
  
  let button = document.createElement('button');
  button.textContent = 'X';
  button.commandForElement = document.getElementById("grid");
  grid.appendChild(button);
  button.command = '--removeCard' + uniqueIdCounter;
  uniqueIdCounter++;
  resetOrder();
  updateText();
}

function addCard(question, answer) {
  let div1 = document.createElement('div');
  div1.appendChild(document.createElement('textarea'))
  div1.children[0].textContent = question;
  let div2 = document.createElement('div');
  div2.appendChild(document.createElement('textarea'))
  div2.children[0].textContent = answer;
  grid.appendChild(div1);
  grid.appendChild(div2);
  
  let button = document.createElement('button');
  button.textContent = 'X';
  button.commandForElement = document.getElementById("grid");
  grid.appendChild(button);
  button.command = '--removeCard' + uniqueIdCounter;
  uniqueIdCounter++;
  resetOrder();
  updateText();
}

function cardCount() {
  return grid.children.length/3-1;
}

function getFront(index) {
  return grid.children[index*3+3].children[0].value;
}
function getBack(index) {
  return grid.children[index*3+4].children[0].value;
}
function clearCards() {
  while(cardCount()>0)
    removeCard(5);
}
function resetOrder() {
  for(i=0;i<cardCount();i++) {
    order[i]=i;
  }
}

for(i=0;i<data['cards'].length;i++) {
  order[i]=i;
}

for(i=0; i<data['cards'].length;) {
  addCard(data['cards'][i]['question'], data['cards'][i]['answer']);
}
updateText();