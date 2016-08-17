var fs = require('fs');
var csv = require('fast-csv');
/*
fs.createReadStream('exportSensorData.csv')
    .pipe(csv({headers : false}))
    .on('data', function(data){
        console.log(data);
    })
    .on('end', function(data){
        console.log('Read Finished');
    });
*/

var stream = fs.createReadStream("exportSensorData.csv");

jumpHeader = true;

csv
 .fromStream(stream, {headers : false})
 .on("data", function(data){
     //jump headers
     if (jumpHeader == true) {         
         jumpHeader = false;
     } else {
         console.log(data.[1]);
     }
     
 })
 .on("end", function(){
     console.log("done");
 });