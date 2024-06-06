const fs = require('fs');
const ethers = require('ethers');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let nonContractCnt = 0;
console.log("started", new Date().toLocaleString());
// Connect to the Astar zkEVM network
let provider = new ethers.providers.JsonRpcProvider('https://rpc.astar-zkevm.gelato.digital');

// Read the CSV file and create an array of objects
let data = [];
fs.createReadStream('output.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', async () => {
    // Loop over the array and check if each id is a contract address
    for (let i = 0; i < data.length; i++) {
      if (data[i].ID) { // Check if data[i].ID is defined
        let code = await provider.getCode(data[i].ID);
        if (code !== '0x') { // If the code is not '0x', it's a contract address
          console.log(`Contract address found: ${i} ${data[i].ID}`)
          data.splice(i, 1); // Remove the object from the array
          i--; // Decrement i since the array length has decreased
        }
      }
      else {
        console.log(`ID for entry ${i} is undefined`);
      }
    }

    // Write the remaining objects to noncontract.csv
    const csvWriter = createCsvWriter({
      path: 'noncontract.csv',
      header: [
        {id: 'ID', title: 'ID'},
        {id: 'Holding', title: 'HOLDING'}
      ]
    });
    await csvWriter.writeRecords(data);
    console.log(`The noncontract.csv file contains ${data.length} entries.`);
    console.log("ended", new Date().toLocaleString());
  });

