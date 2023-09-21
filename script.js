const resultEL = document.getElementById('result')
const lengthEL = document.getElementById('length')
const uppercaseEL = document.getElementById('Uppercase')
const lowercaseEL = document.getElementById('Lowercase')
const numberEL = document.getElementById('Number')
const symbolEL = document.getElementById('Symbols')
const generateEL = document.getElementById('generate')
const clipboardEL = document.getElementById('clipBoard')


const randomFunc = {
    lower: getrandomLowerCase,
    upper: getrandomUpperCase,
    number: getrandomNumber,
    symbol: getrandomSymbol
}

generateEL.addEventListener('click', () => {
    const length = +lengthEL.value
    const isLower = lowercaseEL.checked
    const isupper = uppercaseEL.checked
    const isnumber = numberEL.checked
    const issymbol = symbolEL.checked

    resultEL.innerText = generatePassword(isLower, isupper, isnumber, issymbol, length)
})

clipboardEL.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const passWord = resultEL.innerText
    if (!passWord) { return }

    textarea.value = passWord
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password is copied to Clipboard')

})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])
    if (typesCount === 0) {
        return ''
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()


        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword


}

function getrandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}


function getrandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}


function getrandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getrandomSymbol() {
    const symbol = "!@#$%^&*_+<>?~(){}./;|"
    return symbol[Math.floor(Math.random() * symbol.length)]
}

