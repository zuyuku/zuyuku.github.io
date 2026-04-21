const input = document.querySelector('input[type="file"]');
input.value = null;
input.addEventListener('change', () => {
    const reader = new FileReader();
    reader.onload = () => {
        clearCards();
        const temp = JSON.parse(reader.result);
        order = [];
        for(i=0;i<temp['cards'].length;i++) {
        order[i]=i;
        }
            
        for(i=0; i<temp['cards'].length;) {
            addCard(temp['cards'][i]['question'], temp['cards'][i]['answer']);
        }
        name.value = temp['name'];
        flashText("Deck imported!");
    };
    reader.readAsText(input.files[0]);
});