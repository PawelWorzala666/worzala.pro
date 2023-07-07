const express = require('express')
const app = express()

app.use(express.static('./public'))

/*app.get('/bundle.js', async(req, res)=>{
    res.send(await build(false))
})

app.get('/bundle.min.js', async(req, res)=>{
    res.send(await build(true))
})*/

app.listen(3000)