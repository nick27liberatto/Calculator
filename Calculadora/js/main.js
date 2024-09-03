//GET DOM ELEMENTS

//DISPLAY
const show = document.getElementById("show")
//EQUAL
const equal = document.getElementById("equal")



//SET MUTABLE CONSTANTS (gambiarra)

//STORE THE PART 1, 2 AND RESULTS
const elements = {
    part1 : 0,
    part2 : 0,
    result : 0,
    store : 0
}

//GET CURRENT OPERATION
const currentOp = {
    state : ""
}

//STORE THE VALUES
const numbers = []

//CATCH CLICK EVENT ANYWHERE IN DOM
document.addEventListener("click", (evt) => {
    //if click after a calculation it resets the display and set up for new one
    if(evt.target.matches('button') && currentOp.state == "none") {
        show.innerHTML = ''
        let resetDisplay = evt.target.getAttribute('data-value');
        if (resetDisplay != null) {
            numbers.push(resetDisplay)
            show.innerHTML = resetDisplay
            //console.log(resetDisplay)
        }
        currentOp.state = ""
    } //get numbers and put in display and array with the values
    else {
        let buttonValue = evt.target.getAttribute('data-value');
        if (buttonValue != null) {
            show.innerHTML += buttonValue
            numbers.push(buttonValue)
            //console.log(buttonValue)
        }
    }
})

//FUNCTION TO DEFINE STATE, DISPLAY SYMBOL AND DEAL WITH FIRST VALUES
function setUpCalc(opValue) {
    
    //CONCATENATE AND STORE VALUES BEFORE OPERATION
    if (elements.part1 == 0) {
        elements.part1 = numbers.join('')
        numbers.length = 0
         //console.log(elements.part1)
    }
    
    //DEFINE STATE AND DISPLAY SYMBOLS
    switch (opValue) {
        case '+':
            //display plus
            currentOp.state = "+"
            show.innerHTML += currentOp.state
            console.log(currentOp.state)
            break;
        case '-':
            currentOp.state = "-"
            show.innerHTML += currentOp.state
            console.log(currentOp.state)
            break;
        case '*':
            currentOp.state = "*"
            show.innerHTML += currentOp.state
            console.log(currentOp.state)
            break;
        case '/':
            currentOp.state = "/"
            show.innerHTML += currentOp.state
            console.log(currentOp.state)
            break;
    }
}

//EQUATIONS
function sumValues() {if (elements.store != 0) {elements.result = Number(elements.store) + Number(elements.part2)} 
else {elements.result = Number(elements.part1) + Number(elements.part2)}}

function minusValues() {if (elements.store != 0) {elements.result = Number(elements.store) - Number(elements.part2)} 
else {elements.result = Number(elements.part1) - Number(elements.part2)}}

function multiValues() {if (elements.store != 0) {elements.result = Number(elements.store) * Number(elements.part2)} 
else {elements.result = Number(elements.part1) * Number(elements.part2)}}

function divValues() {if (elements.store != 0) {elements.result = Number(elements.store) / Number(elements.part2)} 
else {elements.result = Number(elements.part1) / Number(elements.part2)}}

//HISTORY
function storeHistory() {
    localStorage.setItem('parte 1', elements.part1)
    localStorage.setItem('parte 2', elements.part2)
    localStorage.setItem('resultado', elements.result)
    localStorage.setItem('store', elements.store)
    displayHistory()
}
function displayHistory() {
    const parteUm = localStorage.getItem('parte 1')
    const parteDois = localStorage.getItem('parte 2')
    const resultado = localStorage.getItem('resultado')
    const store = localStorage.getItem('store')
    
    let historyUl = document.getElementById("historyUl")
    let history = document.createElement('li')

    historyUl.appendChild(history)  
    if (elements.store != 0) {
        console.log("store:" + store)
        history.innerHTML = `${store} ${currentOp.state} ${parteDois} = ${resultado}`
    } else {
        console.log("parte um:" + parteUm)
        history.innerHTML = `${parteUm} ${currentOp.state} ${parteDois} = ${resultado}`
    }
}


//CONCATENATE AND STORE THE SECOND HALF OF THE VALUES, CALL THE FUNCTION TO CALCULATE AND DISPLAY RESULT
equal.addEventListener("click", async () => {
    await new Promise((resolve) => {

            //CONCATENATE AND STORE VALUES AFTER OPERATION
            if (elements.part2 == 0) {
                elements.part2 = numbers.join('')
                numbers.length = 0
            }

            //GUIDING TO RIGHT EQUATIONS
            switch (currentOp.state) {
                case "none":
                    console.log(currentOp.state)
                    break;
                case "+":
                    sumValues()
                    console.log(`${elements.part1} + ${elements.part2} = ${elements.result}`)
                    console.log(currentOp.state)
                    break;
                case "-":
                    minusValues()
                    console.log(`${elements.part1} - ${elements.part2} = ${elements.result}`)
                    console.log(currentOp.state)
                    break;
                case "*":
                    multiValues()
                    console.log(`${elements.part1} * ${elements.part2} = ${elements.result}`)
                    console.log(currentOp.state)
                    break;
                case "/":
                    divValues()
                    console.log(`${elements.part1} / ${elements.part2} = ${elements.result}`)
                    console.log(currentOp.state)
                    break;
            }

            //DISPLAY RESULT
            show.innerHTML = elements.result

            //SAVE IN LOCALSTORAGE AND DISPLAY HISTORY
            storeHistory()

            //STORE THE LATEST RESULT TO NEXT EQUATION
            elements.store = elements.result

            //RESET ELEMENTS
            elements.result = 0
            elements.part1 = 0
            elements.part2 = 0
            resolve()
        }).then(() => {
            //RESET THE DISPLAY CONTENT ONLY AFTER THE RESULT IS DISPLAYED
            setTimeout(() => {
              currentOp.state = "none"
            }, 0);
          })
    })

//BUTTON TO CLEAN UP CALCULATOR
function limparCalc() {
    show.innerHTML = ''
    numbers.length = 0
    elements.store = 0
    elements.result = 0
    elements.part1 = 0
    elements.part2 = 0
}

//BUTTON TO CLEAN UP LOCALSTORAGE AND RELOAD PAGE
function limparHist() {
    localStorage.clear()
    location.reload()
}





