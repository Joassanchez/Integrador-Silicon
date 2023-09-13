const express = require('express');
const mysql = require('mysql');
const config = require('./config.json');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

var connection = mysql.createConnection(config.database); 

var usuario_BD = {};

app.listen(config.server.port, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Estatus de Servidor: ON")
    }
});

connection.connect((err)=>{
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }else{
        console.log("Conectado a la Base de Datos");
    }
});


//-------------------------------------------------------

app.get('/api/usuario',(req,res)=>{
   
    $query = 'SELECT U.nickname, U.password, U.email, U.id_usuario, R.nombreROL FROM Usuario U INNER JOIN ROL R on U.id_rol = R.id_rol';
    
    //CONEXION
    connection.query($query, (err, rows)=>{
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        };
    });
 });//READ)

app.post('/api/usuario',(req,res)=>{
    const { nickname, password, email } = req.body;

    if (!nickname || !password || !email) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    $query = 'INSERT INTO Usuario (nickname,password,email,id_rol) VALUES (?,?,?,?);';
    datos_perosona = [req.body.nickname, req.body.password, req.body.email, req.body.id_rol]

    //CONEXION
    connection.query($query, datos_perosona, function (err, rows){
        
        if(err){
            res.json(err);
            return;
        }else{
            res.json(rows);
            console.log("   -Se creo un Usuario");
        };
    });

});//CREATE


app.put('/api/usuario/:id_usuario', (req, res) => {

    const { nickname, password, email } = req.body;

    if (!nickname || !password || !email) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const query = 'UPDATE Usuario SET nickname=?, password=?, email=? WHERE id_usuario=?';
    const datosUsuario = [nickname, password, email, req.params.id_usuario];


    // CONEXION
    connection.query(query, datosUsuario, (err, result) => {
        if (err) {
            console.error("Error al actualizar el usuario:", err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log("   -Se actualizó un Usuario");
        res.json({ message: 'Usuario actualizado exitosamente' });
    });
});//UPDATE 



app.delete('/api/usuario/:id_usuario', (req, res) => {

    const query = 'DELETE FROM Usuario WHERE id_usuario=?';

    connection.query(query, req.params.id_usuario, (err, result) => {
        if (err) {
            console.error("Error al eliminar el usuario:", err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log("   -Se elimino un Usuario");
        res.json({ message: 'Usuario eliminado exitosamente' });
    
    });


});//Delete


