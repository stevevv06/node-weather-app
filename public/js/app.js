const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    fetch('/weather?address=' + location)
    .then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                message1.textContent = data.error
                message2.textContent = ''
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})