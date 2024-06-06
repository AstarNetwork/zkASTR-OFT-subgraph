const axios = require('axios');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
        {id: 'id', title: 'ID'},
        {id: 'holding', title: 'Holding'},
    ]
});
const GRAPH_ENDPOINT = 'https://api.studio.thegraph.com/query/68400/zkastr-oft/v0.0.5';

let fetched = 0;
let nonzero = 0;
let data = [];

const fetchPage = async (skip) => {
    const response = await axios.post(GRAPH_ENDPOINT, {
        query: `
            query MyQuery($first: Int, $skip: Int, $blockNumber: Int) {
                userHoldings(
                    first: $first,
                    skip: $skip,
                ) {
                    id
                    holding
                }
            }
        `,
        variables: {
            first: 1000,
            skip: skip,
        }
    });
    if (response.data.errors) {
        console.error('Error fetching data:', response.data.errors);
        return;
    }

    if (!response.data.data || !response.data.data.userHoldings) {
        console.error('No userHoldings data in response:', response.data);
        return;
    }

    console.log(`Fetched ${response.data.data.userHoldings.length} user holdings`);
    fetched += response.data.data.userHoldings.length
    console.log(`Total fetched: ${fetched}`);

    const nonZeroHoldings = response.data.data.userHoldings.filter(userHolding => userHolding.holding !== '0');
    console.log(`Fetched ${nonZeroHoldings.length} nonzero holdings`);
    nonzero += nonZeroHoldings.length
    console.log(`Total nonzero fetched: ${nonzero}`);

    data = data.concat(nonZeroHoldings.map(userHolding => ({
        id: userHolding.id,
        holding: userHolding.holding,
        bridgedIn: userHolding.bridgedIn,
        bridgedOut: userHolding.bridgedOut,
    })));


    return response.data.data.userHoldings.length;


}

const fetchASTRStatus = async () => {
    let skip = 0;
    while (true) {
        const fetchedDataLength = await fetchPage(skip);
        if (fetchedDataLength < 1000) {
            break;
        }
        skip += 1000;
    }

    csvWriter.writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}

fetchASTRStatus(); 