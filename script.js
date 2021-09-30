document.querySelector('.control-buttons span').onclick =function(){
    let yourName = prompt('What is your name?');
    console.log(yourName);
    if(yourName == null || yourName == ''){
        document.querySelector('.info-container .name span').textContent = 'Unknown';
    } else{
        document.querySelector('.info-container .name span').textContent = yourName;
    }
    document.querySelector('.control-buttons').remove();
}


let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blocksContainer.children);
//let orderRange = [...Array(blocks.length).keys()];
//another methode to get order range
let orderRange = Array.from(Array(blocks.length).keys());
console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function(){
        flipBlocks(block);
        // Collect All flipped Cards  
        let allFlippedCard = blocks.filter(flipBlocks => flipBlocks.classList.contains('is-flipped'));
        
        if(allFlippedCard.length === 2){
//            console.log('success function');
            
            // Stop Clicking function 
            stopClicking();
            
            // check matched block function 
            chedMatchedBlocks(allFlippedCard[0], allFlippedCard[1]);
        }
    })
})
// Stop Clicking function 
function stopClicking(){
    blocksContainer.classList.add('no-clicking');
    
    setTimeout(()=> {
        blocksContainer.classList.remove('no-clicking');
    }, duration)
} 
// function of flipping cards (Blocks)
function flipBlocks(selectedBlock){
    selectedBlock.classList.add('is-flipped');
}
function chedMatchedBlocks(firstBlock, secondBlock){
    let triesElement = document.querySelector('.tries span');
    if(firstBlock.dataset.img === secondBlock.dataset.img){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        
        document.querySelector('#success').play();
    } else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');       
        }, duration) 
        
            document.querySelector('#failor').play();

    }
}
// Shuffle function 
function shuffle(myArray){
    let current  = myArray.length,
        temp,
        random;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        
        current--;
      // [1] Save current element in stash
        temp  = myArray[current];
      // [2] current element = Random Element
        myArray[current] =myArray[random];
      // [3] Random Element = Get element from stash
        myArray[random] = temp;
    }
    return myArray
}









