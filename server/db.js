const {Pool,client}=require('pg')

const pool= new Pool({
    user:'postgres',
    password:"Mathu@2005",
    host:"localhost",
    port:5432,
    database:"todo"

})
module.exports =pool

