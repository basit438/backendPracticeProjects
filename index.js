const fs = require('fs');

// fs.readFile('sample.txt',(err,data)=>{

//     if(err){
//         console.log(err);
//     }else{
//         console.log(data.toString());
//     }
    
// });


const str  = "hello this is a sampl3 4 text file";

fs.writeFile('sample3.txt',str,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('file created');
    }
});
