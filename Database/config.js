const mssql = require("mssql");
require("dotenv").config();

const config ={
    user:"sandeepdb2",
    password: process.env.PASSWORD,
    database:"SANDEEPDB2",
    server:"Sqlplesk7.securehostdns.com",
    port : 1234,
    TrustServerCertificate : true,
    options: {
       trustedConnection: true,
       encrypt: true,
       enableArithAbort: true,
       trustServerCertificate: true,
     },
   };
const poolconnect = new mssql.ConnectionPool(config,(err)=>
{
    if(err)
    {
        console.log(`can't connect to database + ${err}`)
    }
    else 
    {
        console.log(`connected`)
    }
})

   
module.exports = {poolconnect};