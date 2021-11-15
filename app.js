const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const port = 3001
const bluebird = require('bluebird');
const { response, application } = require('express');
const cors = require('cors');
let connection;

app.use(express.json());
app.use(cors({ origin: true }));



app.get('/get-service', async (req, res) => {
  const [rows, fields] = await connection.execute("SELECT * FROM servicios");
  console.log({ data: rows })
  res.json({ data: rows });
})
app.get('/get-user', async (req, res) => {
  const email = req.query.email;
  const [rows, fields] = await connection.execute(`SELECT * FROM Usuarios where email = '${email}'`);
  res.json(rows[0])
})
app.get('/get-ventas', async (req, res) => {
  const [rows, fields] = await connection.execute("SELECT * FROM ventas");
  console.log({ data: rows })
  res.json({ data: rows });
})
app.get('/get-users', async (req, res) => {
  const [rows, fields] = await connection.execute("SELECT * FROM Usuarios");
  console.log({ data: rows })
  res.json({ data: rows });
})
app.get('/get-users', async (req, res) => {
  const [rows, fields] = await connection.execute("SELECT * FROM Usuarios");
  console.log({ data: rows })
  res.json({ data: rows });
})

app.listen(port, async () => {
  connection = await mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    user: 'sql5450869',
    password: 'GkLeJqlQIk',
    database: 'sql5450869',
    port: 3306,
    Promise: bluebird
  });

  console.log("Server running on port: " + port);
})
//------------------------------Metodos VENTAS------------------------------------//
app.post('/add-venta', async (req, res) => {
  const venta = req.body;
  const detalle = venta.detalle;
  const cantidad = venta.cantidad;
  const fecha = venta.fechaVenta;
  const valor = venta.valor;
  const docu = venta.documento;
  const name = venta.name;
  const responsable = venta.Responsable;
  const estado = venta.estado;
  await connection.execute(`INSERT INTO ventas ( detalle, cantidad,fechaVenta,valor,documento,name,Responsable,estado ) 
  VALUES('${detalle}',${cantidad},'${fecha}','${valor}','${docu}','${name}','${responsable}','${estado}')`);
  res.json(venta)
})
app.delete('/delete-venta', async (req, res) => {
  const venta = req.body;
  const id = venta.id;
  await connection.execute(`Delete From ventas where id='${id}'`)

})


app.put('/update-venta', async (req, res) => {
  const venta = req.body;
  const id = venta.id;
  const detalle = venta.detalle;
  const cantidad = venta.cantidad;
  const fecha = venta.fechaVenta;
  const valor = venta.valor;
  const docu = venta.documento;
  const name = venta.name;
  const responsable = venta.Responsable;
  const estado = venta.estado;

  await connection.execute(` Update ventas set detalle='${detalle}', cantidad ='${cantidad}' , fechaVenta= '${fecha}',  valor = '${valor}', documento= '${docu}',name = '${name}',Responsable = '${responsable}',estado = '${estado}' where id= '${id}' `);
  res.json(venta)
})
//------------------------------Metodos SERVICIOS---------------------------------//
app.delete('/delete-service', async (req, res) => {
  const service = req.body;
  const id = service.id;
  const valor = service.valor;
  const estado = service.estado;
  await connection.execute(`delete from  servicios where id= '${id}' `);
  await connection.execute(` ALTER TABLE servicios DROP id`);
  await connection.execute(` ALTER TABLE servicios AUTO_INCREMENT = 1`);
  await connection.execute(` ALTER TABLE servicios ADD id int NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST`);
  res.json(service)
})
app.post('/add-service', async (req, res) => {

  const service = req.body;
  const detalle = service.detalle;
  const valor = service.valor;
  const estado = service.estado;
  await connection.execute(`INSERT INTO servicios ( detalle, valor, estado) VALUES( '${detalle}', ${valor},'${estado}')`);
  res.json(service)
})


app.put('/update-service-state',async (req,res)=>{
  const service = req.body;
  const id = service.id;
  const estado = service.estado;
  await connection.execute(` Update  servicios set  estado= '${estado}' where id= '${id}' `);
  res.json(service)
})
app.put('/update-service-value',async (req,res)=>{
  const service = req.body;
  const id = service.id;
  const valor = service.valor;
  await connection.execute(` Update  servicios set  valor ='${valor}'  where id= '${id}' `);
  res.json(service)
})

  //----------------------------Metodos USUARIOS-----------------------------------//
  app.post('/add-users', async (req,res) => {
    const user = req.body;
    const name = user.name;
    const role = user.role;
    const autorizado = user.autorizado;
    const email = user.email;
    await connection.execute(`INSERT INTO Usuarios(name,role,autorizado,email)VALUES('${name}','${role}','${autorizado}','${email}')`);
    res.json(user)
  })
  
  app.delete('/delete-user', async (req,res)=>{
    const user = req.body;
    const name = user.name;
    const idUsuario = user.idUsuario;
    const role = user.role;
    const autorizado = user.autorizado;
    const email = user.email;
    await connection.execute(` delete from  Usuarios where idUsuario= '${idUsuario}' `);
    res.json(user)
  })
  
  app.put('/update-user',async (req,res)=>{
    const user = req.body;
    const name = user.name;
    const idUsuario = user.idUsuario;
    const role = user.role;
    const autorizado = user.autorizado;
    const email = user.email;
    await connection.execute(` Update  Usuarios set name='${name}', role ='${role}' , autorizado= '${autorizado}',  email =  '${email}' where idUsuario= '${idUsuario}' `);
    res.json(user)
  })
  app.put('/update-user-role',async (req,res)=>{
    const user = req.body;
    const idUsuario = user.idUsuario;
    const role = user.role;
  
    await connection.execute(` Update Usuarios set  role ='${role}' where idUsuario = '${idUsuario}' `);
    res.json(user)
  })
  app.put('/update-user-Permissions',async (req,res)=>{
    const user = req.body;
    const idUsuario = user.idUsuario;
    const autorizado = user.autorizado;
  
    await connection.execute(` Update Usuarios set  autorizado ='${autorizado}' where idUsuario = '${idUsuario}' `);
    res.json(user)
  })
  
  

 


