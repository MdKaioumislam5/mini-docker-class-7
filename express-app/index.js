const Keyv = require('keyv');
const express = require('express')
const app = express()
const port = 3000

const keyv = new Keyv('redis://redis:6379');

app.get("/set/:name/:value", async (req, res) => {
    const set =  keyv.set(req.params.name, req.params.value);
    res.send({ set });
})

app.get("/get/:name", async (req, res) => {
    const get = await keyv.get(req.params.name);
    res.send({ get });
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})