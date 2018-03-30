const router =  require('express').Router();
var XLSX = require('xlsx');
var file = require('fs');
var bodyparser=require('body-parser');

router.post('/getData', (req,res)=>{
    console.log("inside getData route");
    // Reading the excel sheet
  var workbook = XLSX.readFile('./data/values.xlsx');
  var sheet_name_list = workbook.SheetNames;
  sheet_name_list.forEach(function(y) {
	   var worksheet = workbook.Sheets[y];
     var headers = {};
     var data = [];
     for(z in worksheet) {
    	if(z[0] === '!') continue;
    	//parse out the column, row, and value
    	 var tt = 0;
       for (var i = 0; i < z.length; i++) {
        	if (!isNaN(z[i])) {
            	tt = i;
            	break;
        	}
        };
        var col = z.substring(0,tt);
        var row = parseInt(z.substring(tt));
    	  var value = worksheet[z].v;
    	   //store header names
    	  if(row == 1 && value) {
        	headers[col] = value;
        	continue;
        }
    	 if(!data[row]) data[row]={};
    	data[row][headers[col]] = value;
	   }
     //drop those first two rows which are empty
     data.shift();
     data.shift();
     var outputPath = JSON.stringify(data);
     //writing the data read from excel to json
     file.writeFileSync('./data/xls_to_json.json',outputPath);
     res.send("JSON is created");
   });
 });

 router.post('/getDetails', (req,res)=>{
   console.log("inside getDetails route");
   var temp=[];
   //reading data from json
   var data=file.readFileSync('./data/xls_to_json.json', 'utf8');
   var content=JSON.parse(data);
   //sending the data to UI
   res.send(content);
 });

   module.exports=router;
