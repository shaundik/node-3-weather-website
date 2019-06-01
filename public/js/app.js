console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById("msg-1")
const msg2 = document.querySelector('#msg-2')

// msg1.textContent = 'namsns'
// msg2.textContent = 'kumscd'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    
    msg1.textContent = 'Searching forecast of given location'
    msg2.textContent =''

    fetch('http://localhost:3000/weather?address='+location+'').then((response) => {
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error)
                msg1.textContent = data.error
                //msg2.textContent =''
            }
            else{
                // console.log(data.location)
                // console.log(data.forecast)
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
    //console.log(location)
})