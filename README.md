This is a prototype put together for the Midnight Developer Challenge on dev.to. Read about it [here](https://dev.to/datadr1ven/token-payout-based-on-private-information-golf-barbecue-coin-gbc-38d5)

To use this repository:

start by runing 'npm install' at the top level directory

 - for the contract
   1. run 'npm install' from boilerplate/contract
   2. run 'npm compact' from boilerplate/contract
   2. run 'npm run build' from boilerplate/contract
 - for the cli
   1. run 'npm install' from boilerplate/contract-cli
   2. run 'npm run build'
   3. run either 'npm run standalone' or 'npm run testnet-remote' (the latter requires starting a proof server via docker)
 - for the ui
   1. run 'npm install' from boilerplate/gbc-ui
   2. run 'npm run dev' from boilerplate/gbc-ui
   3. point a browser at localhost:5173

