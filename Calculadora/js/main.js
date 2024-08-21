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

//check operation with boolean
const operators = {
    adding : false,
    reducing : false, 
    multiplying : false, 
    dividing : false,
    calculated : false
}

//system to clean result from display
const allButtons = document.querySelectorAll('button')
const allOperations = Object.values(operators)

//set variables
const numbers = []

//get values

document.addEventListener("click", (evt) => {

    if(evt.target.matches('button') && elements.calculated == true) {
        show.innerHTML = ''
        let resetDisplay = evt.target.getAttribute('data-value');
        if (resetDisplay != null) {
            numbers.push(resetDisplay)
            show.innerHTML = resetDisplay
            //console.log(resetDisplay)
        }
        elements.calculated = false
    } else {
        let buttonValue = evt.target.getAttribute('data-value');
        if (buttonValue != null) {
            show.innerHTML += buttonValue
            numbers.push(buttonValue)
            //console.log(buttonValue)
        }
    }
}) 

/*const pushNumber = (value) => {
    show.innerHTML += value
    numbers.push(value)
}*/

//store the first values and activate the sum operation
sum.addEventListener("click", () => {

    //display plus
    show.innerHTML += '+'

    //store first values
    if (elements.part1 == 0) {
        elements.part1 = numbers.join('')
        console.log(elements.part1)
        numbers.length = 0
        console.log(numbers)
        operators.adding = true;
    }
})

function sumValues() {
    elements.result = Number(elements.part1) + Number(elements.part2)
}

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
            //concatenate and store part2 of the equation
            if (elements.part2 == 0) {
                elements.part2 = numbers.join('')
                console.log(elements.part2)
                numbers.length = 0
                console.log(numbers)
            }

            //if adding, call sum function, display result and set adding to false
            if (operators.adding == true) {
                sumValues()
                console.log(`${elements.part1} + ${elements.part2} = ${elements.result}`)
                show.innerHTML = elements.result
                operators.adding = false
            }

            storeHistory()

            //reset variables
            elements.result = 0
            elements.part1 = 0
            elements.part2 = 0
            console.log(elements.result)
            console.log(elements.part1)
            console.log(elements.part2)
            resolve()
        }).then(() => {
            setTimeout(() => {
              elements.calculated = true
            }, 0);
          })
    })

function limparCalc() {
    show.innerHTML = ''
    numbers.length = 0
    elements.result = 0
    elements.part1 = 0
    elements.part2 = 0
}

function limparHist() {
    localStorage.clear()
    location.reload()
}





