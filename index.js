import express from 'express'
import mongoose from 'mongoose'

const Tarea = mongoose.model('Tarea', new mongoose.Schema({
  tarea: String,
  estado: String,
}))

const app = express()

mongoose.connect('mongodb://Robguter:150269@mongo_db:27017/miapp?authSource=admin')

app.get('/', async (_req, res) => {
  console.log('Listando Datos...')
  const tareas = await Tarea.find();
  return res.send(tareas)
})
app.get('/crear', async (_req, res) => {
  console.log('Creando...')
  await Tarea.create({ tarea: 'Subir a GitHub', estado: 'Pendiente' })
  return res.send('ok')
})

app.listen(3000, () => console.log('Listening...'))