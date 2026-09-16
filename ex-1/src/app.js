import express from 'express'
const app = express()

app.use(express.json())
const FAMILIA = [
    {nome: 'Cristiane', idade: 45, parentesco: 'mãe'},
    {nome: 'Mario', idade: 50, parentesco: 'pai'},
    {nome: 'Mayara', idade: 14, parentesco: 'irmã'}
]

app.get('/', (req, res) => {
    res.send('Olá mundo')
})

app.get('/familia', (req, res) => {
    res.status(200).send(FAMILIA)
})

app.post('/cadastrar', (req, res) => {
    FAMILIA.push(req.body)
    res.status(201).send(FAMILIA)
})

export default app