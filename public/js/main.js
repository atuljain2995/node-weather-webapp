

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const locationField = document.querySelector('#location')
const forecastField = document.querySelector('#forecast')


// fetch('http://api.weatherstack.com/current?access_key=f7b274eb5e6564852840a7fe9cf83a79&query=42.3601,71.0589&units=m')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchInput.value
    // console.log(location)

    locationField.textContent = "Loading..."
    forecastField.textContent = ""

    fetch('/weather?search='+location)
    .then(response => response.json())
    .then(data => {
        if(data.error)
        {console.log(data.error)}
        else{
            // console.log(data.Location)
            locationField.textContent = data.Location
            forecastField.textContent = data.Forecast
            // console.log(data.Forecast)
            // console.log(data)
        }
    })
    .catch((err=>{ console.log('Location not found')}));
})