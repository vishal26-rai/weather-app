const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityname;
    const AppId = "ee4d9072e1c0c1f36816fffcb303e99f&units=Metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + AppId + "";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const WeatherData = JSON.parse(data)
            console.log(WeatherData);
            const temp = WeatherData.main.temp;
            const Des = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            // const ToSend = ( "<h1>The temprature in Delhi is " + temp +" Degree Celcius And the weather is currently    " + Des +".</h1>")
            // res.send(ToSend) .send able to send one line at a time so insted we use .write
            res.write("<p>The weather is Current " + Des + "</p>");
            res.write("<h1>The temprature in " + query + " is " + temp + "</h1>");
            res.write("<img src = " + imageurl + ">")
        })
    })

})
app.listen(3000, function () {
    console.log("server is listen on 3000");
})