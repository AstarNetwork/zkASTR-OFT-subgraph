const axios = require('axios');

const GRAPH_ENDPOINT = 'https://api.studio.thegraph.com/query/68400/zkastr-oft/v0.0.1'; 

let totalASTRs = 0;

const fetchPage = async (skip) => {
    const response = await axios.post(GRAPH_ENDPOINT, {
        query: `
            query MyQuery($first: Int, $skip: Int, $blockNumber: Int) {
                transfers(
                    first: $first,
                    skip: $skip,
                    where: {
                        and: [
                            {from_not: "0x0000000000000000000000000000000000000000"},
                            {to_not: "0x0000000000000000000000000000000000000000"},
                        ]
                    }
                ) {
                    value
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

  if (!response.data.data || !response.data.data.transfers) {
      console.error('No transfers data in response:', response.data);
      return;
  }

  const values = response.data.data.transfers.map(transfer => parseInt(transfer.value));
  const total = values.reduce((a, b) => a + b, 0);
  totalASTRs += total;
}

const fetchASTRStatusAtBlock = async (blockNumber) => {
    let skip = 0;
    while (true) {
        await fetchPage(skip, blockNumber);
        skip += 1000;
        if (skip >= totalASTRs) {
            break;
        }
    }
    console.log(`Total ASTRs transferred at block ${blockNumber}: ${totalASTRs}`);
}

fetchASTRStatusAtBlock(1860738); // replace with the block number you're interested in