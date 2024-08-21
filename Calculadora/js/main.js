//get dom elements

//display
const show = document.getElementById("show")
//equal
const equal = document.getElementById("equal")
//operators
const sum = document.getElementById("sum")
const minus = document.getElementById("minus")
const multi = document.getElementById("multi")
const div = document.getElementById("div")

//set global mutable variables
const elements = {
    part1 : 0,
    part2 : 0,
    result : 0
}

const currentOp = {
    state : ""
}

//set variables
const numbers = []

//get click anywhere in dom
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

//store the first values and activate the operations
function setUpCalc(opValue) {
    //store first values
    if (elements.part1 == 0) {
        elements.part1 = numbers.join('')
        numbers.length = 0
         //console.log(elements.part1)
    }
    //get content
    switch (opValue) {
        case '+':
            //display plus
            show.innerHTML += '+'
            currentOp.state = "sum"
            console.log("soma")
            break;
        case '-':
            show.innerHTML += '-'
            currentOp.state = "minus"
            console.log("menos")
            break;
        case '*':
            show.innerHTML += '*'
            currentOp.state = "multi"
            console.log("multi")
            break;
        case '/':
            show.innerHTML += '/'
            currentOp.state = "div"
            console.log("div")
            break;
    }
}

//EQUATIONS
function sumValues() {elements.result = Number(elements.part1) + Number(elements.part2)}
function minusValues() {elements.result = Number(elements.part1) - Number(elements.part2)}
function multiValues() {elements.result = Number(elements.part1) * Number(elements.part2)}
function divValues() {elements.result = Number(elements.part1) / Number(elements.part2)}

//HISTORY
function storeHistory() {
    localStorage.setItem('parte 1', elements.part1)
    localStorage.setItem('parte 2', elements.part2)
    localStorage.setItem('resultado', elements.result)
    displayHistory()
}
function displayHistory() {
    const parteUm = localStorage.getItem('parte 1')
    const parteDois = localStorage.getItem('parte 2')
    const resultado = localStorage.getItem('resultado')
    
    let historyUl = document.getElementById("historyUl")
    let history = document.createElement('li')

    historyUl.appendChild(history)  
    history.innerHTML = `${parteUm} + ${parteDois} = ${resultado}`
}


//show the results and calculate
equal.addEventListener("click", async () => {
    await new Promise((resolve) => {
            //CONCATENATE THE PART TWO OF THE EQUATION AND STORE
            if (elements.part2 == 0) {
                elements.part2 = numbers.join('')
                numbers.length = 0
            }

            //GUIDING TO RIGHT EQUATIONS
            switch (currentOp.state) {
                case "none":
                    console.log(currentOp.state)
                    break;
                case "sum":
                    sumValues()
                    console.log(`${elements.part1} + ${elements.part2} = ${elements.result}`)
                    console.log(currentOp.state)
                    break;
                case "minus":
                    minusValues()
                    console.log(`${elements.part1} - ${elements.part2} = ${elements.result}`)
                    console.log(currentOp.state)
                    break;
                case "multi":
                    multiValues()
                    console.log(`${elements.part1} * ${elements.part2} = ${elements.result}`)
                    console.log(currentOp.state)
                    break;
                case "div":
                    divValues()
                    console.log(`${elements.part1} / ${elements.part2} = ${elements.result}`)
                    console.log(currentOp.state)
                    break;
            }

            //DISPLAY RESULT
            show.innerHTML = elements.result

            //SAVE IN LOCALSTORAGE AND DISPLAY HISTORY
            storeHistory()

            //RESET ELEMENTS
            elements.result = 0
            elements.part1 = 0
            elements.part2 = 0
            resolve()
        }).then(() => {
            //RESET THE DISPLAY CONTENT JUST AFTER THE RESULT IS DISPLAYED
            setTimeout(() => {
              currentOp.state = "none"
            }, 0);
          })
    })

//BUTTON TO CLEAN UP CALCULATOR
function limparCalc() {
    show.innerHTML = ''
    numbers.length = 0
    elements.result = 0
    elements.part1 = 0
    elements.part2 = 0
}

//BUTTON TO CLEAN UP LOCALSTORAGE AND RELOAD PAGE
function limparHist() {
    localStorage.clear()
    location.reload()
}





