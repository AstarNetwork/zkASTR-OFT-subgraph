const fs = require('fs');
const csv = require('csv-parser');

let sum = BigInt(0);

fs.createReadStream('noncontract.csv')
  .pipe(csv())
  .on('data', (row) => {
    const [address, holding] = Object.values(row);
    sum += BigInt(holding);
  })
  .on('end', () => {
    const wei = sum.toString();
    const ether = (sum / BigInt(10 ** 18)).toString() + '.' + (sum % BigInt(10 ** 18)).toString().padStart(18, '0');
    console.log(`Sum in wei: ${wei}`);
    console.log(`Sum in ASTR: ${ether}`);
  });