console.log('Script is being loaded into browser')

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const p1 = document.querySelector('p#message-1')
const p2 = document.querySelector('p#message-2')

weatherForm.addEventListener('submit', (event) => {
    const address = input.value;
    event.preventDefault();
    p1.textContent = 'Loading...'
    p2.textContent = ''

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error //error
                p2.textContent = ''
            } else {
                p1.textContent = data.location
                p2.textContent = data.forecast //forecast
            }
        })
    })
})

/*
 doesn't work because destructured variables return undefined undefined since geoCoding/forecast functions cbs return
 undefined on an error

fetch('http://127.0.0.1:3001/weather?address=1timmmie').then((response) => {
    response.json().then((data) => {
        const {
            forecast,
            location
        } = data;
        console.log(forecast, location)
    }).catch((err) => {
        console.log(err)
    })
})

*/
// fetch('http://127.0.0.1:3001/weather?address=london').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })