<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac3aa4 (Initial)
var fs = require("fs");
const fs_Promises = require("fs").promises;



module.exports.getDocumentation = function(res){
    fs.readFile("./apps/www.smartcommerci.co-node-js/src/data/documents.json", "utf8", function (err, result) {
        var data2 = JSON.parse(result);
        data2 = data2.documents;
        var data = [];

        if (!err) {
            start();


            // Function to get code of the files
            async function start() {
                for (const k in data2) {
                    var path = data2[k].file.toString();
                    const pathNames = await fs_Promises.readFile(path);
                    var language = "javascript"
                    if(path.split(".")[path.split(".").length -1] == "ejs"){language = "language-html"}
                    if(path.split(".")[path.split(".").length -1] == "css"){language = "language-css"}
                    if(path.split(".")[path.split(".").length -1] == "handlebars"){language = "language-html"}
                    data.push({ 
                      file: data2[k].file, 
                      details: data2[k].details, 
                      dependeces: data2[k].dependeces,
                      language: language,
                      context: pathNames.toString().trim() 
                    });
                    
                }

                res.render("documentation", {documents : data}); 
            }
          
        }
    });
} 

<<<<<<< HEAD
=======
var fs = require("fs");
const fs_Promises = require("fs").promises;



module.exports.getDocumentation = function(res){
    fs.readFile("./apps/www.smartcommerci.co-node-js/src/data/documents.json", "utf8", function (err, result) {
        var data2 = JSON.parse(result);
        data2 = data2.documents;
        var data = [];

        if (!err) {
            start();


            // Function to get code of the files
            async function start() {
                for (const k in data2) {
                    var path = data2[k].file.toString();
                    const pathNames = await fs_Promises.readFile(path);
                    var language = "javascript"
                    if(path.split(".")[path.split(".").length -1] == "ejs"){language = "language-html"}
                    if(path.split(".")[path.split(".").length -1] == "css"){language = "language-css"}
                    if(path.split(".")[path.split(".").length -1] == "handlebars"){language = "language-html"}
                    data.push({ 
                      file: data2[k].file, 
                      details: data2[k].details, 
                      dependeces: data2[k].dependeces,
                      language: language,
                      context: pathNames.toString().trim() 
                    });
                    
                }

                res.render("documentation", {documents : data}); 
            }
          
        }
    });
} 

>>>>>>> 8aa9bc6 (version commit)
=======
>>>>>>> 2ac3aa4 (Initial)
