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


//set mutable variables
const elements = {
    part1 : 0,
    part2 : 0,
    result : 0
}

const operators = {
    adding : false,
    reducing : false, 
    multiplying : false, 
    dividing : false
}

//set variables
const numbers = []

//get values
const pushNumber = (value) => {
    show.innerHTML += value
    numbers.push(value)
}

//store the first values and activate the sum operation
sum.addEventListener("click", () => {

    //add simbol to display
    show.innerHTML += '+'

    //store first values
    if (elements.part1 == 0) {
        elements.part1 = numbers.join('')
        console.log(numbers)
        numbers.length = 0
        console.log(numbers)
        operators.adding = true;
    }
})

function sumValues() {
    elements.result = Number(elements.part1) + Number(elements.part2)
}

//show the results and calculate
equal.addEventListener("click", () => {

    if (elements.part2 == 0) {
        elements.part2 = numbers.join('')
        console.log(numbers)
        numbers.length = 0
        console.log(numbers)
    }

    if (operators.adding == true) {
        sumValues()
    }

    
    show.innerHTML = elements.result
    console.log(`${elements.part1} + ${elements.part2} = ${elements.result}`)
})






