var  express        = require("express")
   , app            = express()
   , cors           = require('cors')
   , mongoose       = require("mongoose")
    , axios         = require("axios")
   , bodyParser     = require("body-parser");

const path = require("path");
mongoose.connect('c');
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client", "build")));


const dashboard = require('./routes/dashboard');

app.get("/getRawData",(req,res)=>{
    axios.get('https://api.covid19india.org/raw_data.json')
        .then(response => {
           // console.log(response)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error);
        });
});

app.get("/getDistrictWiseData",(req,res)=>{
    axios.get('https://api.covid19india.org/state_district_wise.json')
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            console.log(error);
        });
});


app.get("/getHospitalBedData",(req,res)=>{
    axios.get('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            console.log(error);
        });
});




app.use('/', dashboard);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(7000,function(){
     console.log("app server has started on 7000");
});

