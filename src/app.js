const path = require ('path');
const express = require ("express");
const hbs = require("hbs");
var bodyParser = require('body-parser')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
 
//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

let locationChosen = ""


app.get('/', (req, res)=>{
    res.render('index',{
        title: "Weather",
        name: 'Chuma Achike'
    });
});
app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About Me",
        name: "Achike Chuma"
    });
});
// app.get('/help', (req, res)=>{
//     res.render('help',{
//         title: "Help",
//         message: "What do you need?",
//         name: "Achike Chuma"
//     });
// });
app.post('/', (req, res)=>{
    locationChosen = req.body.locationChosen
    res.redirect('weather')
})
app.get('/weather', (req, res)=>{
    geocode(locationChosen,(error, {longitude, latitude, location}={})=>{
        if(error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) return
            res.render('weather',{
                location: `${location}`,
                weather: `${forecastData}`,
                address: `${locationChosen}`,
                name: 'Achike Chuma'
            });
        })  
    })
    
   
});
// app.get('/products', (req, res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:"You must provide a search term"
//         })
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
// })
// app.get('/help/*',(req, res)=>{
//     res.render('404',{
//         title: "help help",
//         message: "help article not found",  
//         name: "Achike Chuma"
//    })
// })
app.get('*', (req, res)=>{
    res.render('404',{
         title: "Anyhow help", 
         message: "Page not found",
         name: "Achike Chuma"
    })
})

app.listen(3000, ()=>{
    console.log("App is running ")
})





