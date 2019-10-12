const fs = require("fs");
let ENV = "local" // prod
let envData = null;
process.argv.slice(2).forEach((val, index) => {
    //console.log(`${index}: ${val}`);
    if (val.toString().startsWith('ENV')) {
        ENV = val.split("=")[1];
        console.log('Server is running at ' + ENV);
    }
});
envData = fs.readFileSync("./properties/" + ENV + ".json", 'utf-8');
module.exports = JSON.parse(envData);