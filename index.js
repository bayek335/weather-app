import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';

const app = express()
const PORT = 3000
const API_OPEN_WEATHER = '5424b29707b37dfd2965b9a9a47d480b'
const API_GEOLOCATION_KEY = '2d99f20b4da2452e9418d9c3ce4c9236'
const days = [
    'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]
const weather_main = {
'Clear': 'sun', 
'Rain': 'rain',
}


app.set('view engine', 'ejs')

app.set('layout', 'layout/main')


app.use(expressLayouts)

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))


/**
 * GET
 * /home
 */
app.get('/',async (req, res)=>{
    try {
        const geolocation = await axios.get('https://ipgeolocation.abstractapi.com/v1/',{
            params:{
                api_key: API_GEOLOCATION_KEY
            }
        }) 
        const city = geolocation.data.city
        let currentDate = days[new Date().getDay()]
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}`,{
            params:{
                appid:API_OPEN_WEATHER
            }
        })
         const result = response.data
         const data = {
            coord :result.coord,
            weather:{
                main : result.weather[0].main,
                description : result.weather[0].description
            },
            main:{
                temp: result.main.temp,
                feels_like: result.main.feels_like,
                humidity: result.main.humidity,
                sea_level: result.main.sea_level
            },
            wind:{
                speed: result.wind.speed
            },
            clouds:{
                all:result.clouds.all
            },
            sys:{
                country:result.sys.country
            },
            id:result.id,
            name: result.name,
            cod: result.cod
         }
        res.render('index',{data, currentDate, weather_main})
    } catch (error) {
        res.render('index',{
            error:error.response.data
        })
    }
})


/**
 * POST
 * /home
 */
app.post('/',async (req, res)=>{
    try {
        const keyword = req.body.name
        let currentDate = days[new Date().getDay()]
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=5424b29707b37dfd2965b9a9a47d480b`)
         const result = response.data
         const data = {
            coord :result.coord,
            weather:{
                main : result.weather[0].main,
                description : result.weather[0].description
            },
            main:{
                temp: result.main.temp,
                feels_like: result.main.feels_like,
                humidity: result.main.humidity,
                sea_level: result.main.sea_level
            },
            wind:{
                speed: result.wind.speed
            },
            clouds:{
                all:result.clouds.all
            },
            sys:{
                country:result.sys.country
            },
            id:result.id,
            name: result.name,
            cod: result.cod
         }
        res.render('index',{data, currentDate, weather_main})
    } catch (error) {
        res.render('index',{
            error:error.response.data
        })
    }
})



app.listen(PORT,()=>{
    console.log("Running on port : "+PORT);
})