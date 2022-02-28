//EJEMPLO CON MODULO NATIVO HTTP
/*
const http = require('http')

//Creo el servidor con el modulo createServer
const server = http.createServer((req,res) => {
//Cada vez que se reciba una petición por el puerto 8080, veré este mensaje en el navegador (servidor a cliente)
	res.end("Hola mundo")
})

// .listen es un método que le dice al servidor por qué puerto se va a ubicar.
const connectedServer = server.listen(8080,() => {
//cuando se inicie el servidor, en la consola(servidor) veré el siguiente mensaje (opcional)
	console.log(`http server listening at port ${connectedServer.address().port}`)
})
*/
//EJEMPLO CON MODULO EXTERNO EXPRESS (MAS FACIL)

const fs = require('fs');

const express = require('express');

const app = express();

const port = 8080

const server = app.listen(port,()=> {
	console.log(`http server listening at port ${server.address().port}`)
})

//Devuelve un array con todos los productos disponibles en el servidor
app.get('/productos',(req,res) => {

        try{
          function getProducts(){
          const contenido = fs.readFileSync('./products.txt', 'utf-8') 
          const json = JSON.parse(contenido.split(","))
          return json
          }
        }
    
      catch(err) {
        console.log("contenido no leido",err)
      }
    
	res.send({products:getProducts()})
})

//Devuelve un producto elegido al azar entre todos los productos disponibles

app.get('/productoRandom',(req,res) => {

        try{
          function getRandom(){
          const contenido = fs.readFileSync('./products.txt', 'utf-8') 
          const json = JSON.parse(contenido.split(","))
          const min = json[0].id
          const max = json.slice(1).slice(-1)[0].id
          const random = Math.floor(Math.random() * (max - min + 1)) + min
		  return json.find(product => product.id == random)
          }
        }
    
      catch(err) {
        console.log("contenido no leido",err)
      }
    
	res.send({products:getRandom()})
})


