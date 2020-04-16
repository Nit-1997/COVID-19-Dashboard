var  express        = require("express")
   , app            = express()
   , cors           = require('cors')
   , mongoose       = require("mongoose")
   , bodyParser     = require("body-parser");

const path = require("path");
mongoose.connect('YOUR DB');
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client", "build")));


const dashboard = require('./routes/dashboard');


app.use('/', dashboard);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// const port  = process.env.PORT||7000;
// app.listen(port,process.env.IP,function(){
//      console.log("app server has started on heroku ");
// });

app.listen(7000,function(){
     console.log("app server has started on 7000");
});

