const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
const https = require('https');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//Routing of Paths : Homepage

var bmi = "";
var status ="";
app.get('/', (req, res) => {
    
    var meterCode = "";
    res.render('index', {result: bmi, status: status});
})

app.post('/', (req, res) => {
    var weight = req.body.weight;
    var height = req.body.height * 0.01;
    var unit = req.body.unit;
    var age = req.body.age;
    var status = "";
    
    if (unit === "lbs"){
        weight = req.body.weight * 0.453592;
    }else{
        weight = req.body.weight;
    }

    // bmi = weight / Math.pow(height, 2); BMI Calculator Formula for KG/square meter
    var bmiCalc = weight / Math.pow(height, 2)
    bmi = bmiCalc.toFixed(1);
    console.log(bmi)
    
    // Meter Code generate based on the BMI Result
    if(bmi < 18.5){
        status = "Underweight";
    }else if(bmi >= 18.5 & bmi <=25){
        status = "Normal";   
    }else if(bmi >25 & bmi < 30){
        status = "Overweight";
    }else{
        status = "Obesity";
    }

    res.render('index', {result: bmi, status: status});
})


// Listening to Local Port or Server Port
app.listen(port, function() {
    console.log('listening on port ' + port);
});

