const d3 = require('d3-fetch');
if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch-polyfill');
}
const arrayToTxtFile = require('array-to-txt-file')

const filePath = 'http://localhost:5000/input/'
const args = process.argv.slice(2)
const configFile = args[0]
const csvName = args[1]

//get the config file specified on script run
fetch(filePath + configFile + ".json").then((response) => response.json())
    .then(json => {
        afterConfigLoaded(json)
    }).catch(function (error) {
        console.log(error);
    });


//write the output csv headers
function afterConfigLoaded(config) {
    //get the input csv
    d3.csv(filePath + csvName + ".csv").then(function (d) {
        let output = []
        //set up loop for all the input data fields
        // for (i = 1; i < config.input.length; i++) {
        //     //loop through the input data
        //     for (j = 0; j < d.length; j++) {
        //         //get the output headers from the config
        //         heading1 = config.headers[0].id
        //         heading2 = config.headers[1].id
        //         heading3 = config.headers[2].id
        //         //create the output data, ignoring any fields where there is null
        //         if (d[j][config.input[i]] != 0) {
        //             text = {
        //                 [heading1]: d[j][config.input[0]],
        //                 [heading2]: d[j][config.input[i]],
        //                 [heading3]: d.columns[i]
        //             }
        output.push(d[1].test + " <> " + d[0].test + " .")
        //         }
        //     }
        // }



        arrayToTxtFile(output, 'output/output.ttl', err => {
            if (err) {
                console.error(err)
                return
            }
            console.log('Successfully wrote to txt file')
        })
    })
}