const address = "0x0003ac70130ec3a65d755675c2e12a945d82d2ab";
const transfers = 
[
    {
      "from": "0x8bcbd2b0240c3e54d803e33ba944fa98267312ff",
      "id": "0x048b84cfcc395a880cde2eb741e361c01b92d11bd8cd4f4544b83eddf09f516604000000",
      "to": "0x0003ac70130ec3a65d755675c2e12a945d82d2ab",
      "transactionHash": "0x048b84cfcc395a880cde2eb741e361c01b92d11bd8cd4f4544b83eddf09f5166",
      "value": "26690875143880017463"
    },
    {
      "from": "0x0003ac70130ec3a65d755675c2e12a945d82d2ab",
      "id": "0x1b92ac09f064c893a3a16d6827e6163a82c6aa2e182e75ce6be50028c3f19b5202000000",
      "to": "0x002a6b6a1348b33d03ab66fcb64937b8cbf2aa7c",
      "transactionHash": "0x1b92ac09f064c893a3a16d6827e6163a82c6aa2e182e75ce6be50028c3f19b52",
      "value": "26819093450798321323"
    },
    {
      "from": "0x0003ac70130ec3a65d755675c2e12a945d82d2ab",
      "id": "0x5a5541c715f15f6e75a553c2d842bf3669d380444fbf8c37d717d5512d8f420302000000",
      "to": "0xf9a0bb079432455e4616fdbb8c59e240a48a5b89",
      "transactionHash": "0x5a5541c715f15f6e75a553c2d842bf3669d380444fbf8c37d717d5512d8f4203",
      "value": "26690875143880017463"
    },
    {
      "from": "0x8bcbd2b0240c3e54d803e33ba944fa98267312ff",
      "id": "0x80f282ba633671f95de5f8c44423fbe300df4c21ff8b593559dce3a66b0fa40504000000",
      "to": "0x0003ac70130ec3a65d755675c2e12a945d82d2ab",
      "transactionHash": "0x80f282ba633671f95de5f8c44423fbe300df4c21ff8b593559dce3a66b0fa405",
      "value": "26819093450798321323"
    }
  ]

  const table = transfers.map(transfer => {
    const value = BigInt(transfer.value);
    const amount = transfer.from === address ? -value : value;
    return {
      blockTimestamp: transfer.blockTimestamp,
      from: transfer.from,
      to: transfer.to,
      amount: amount,
    };
  });
  
  console.table(table.map(transfer => ({...transfer, amount: transfer.amount.toString()})));
  
  const totalAmount = table.reduce((total, transfer) => total + transfer.amount, BigInt(0));
  
  console.log(`Total amount: ${totalAmount.toString()}`);