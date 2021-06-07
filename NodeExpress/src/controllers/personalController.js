const connection = require('../config/connection');


function listarPersonal(req, res) {
    if(connection) {
        let sql = "SELECT * FROM personal";
        connection.query(sql, (err, personal) => {
            if(err) {
                res.json(err);
            } else {
                res.json(personal);
            }
        });
    }
}

function obtenerPersonal(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM personal WHERE id = ${connection.escape(id)}`;
        connection.query(sql, (err, personal) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(personal === undefined || personal.length == 0)
                mensaje1 = "No se ha encontrado el Personal";

                res.json({data: personal[0], mensaje: mensaje1});
            }
        })
    }

}

function crearPersonal(req, res){
    if(connection){
        const personal = req.body;
        if(!personal.Nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(!personal.Apellidos){
            return res.status(400).send({error: true, mensaje: "Los apellidos son obligatorios"});
        }

        if(personal.Nombre.length > 50){
            return res.status(400).send({error: true, mensaje: "La longitud maxima de Nombre es de 50 caracteres"});
        }
        if(personal.Apellidos.length > 80){
            return res.status(400).send({error: true, mensaje: "La longitud maxima de los apellidos es de 80 caracteres"});
        }
        if(personal.Telefono && personal.Telefono.length > 10){
            return res.status(400).send({error: true, mensaje: "La longitud maxima del telefono es de 10 caracteres"});
        }

        let sql = "INSERT INTO personal set ?";

        connection.query(sql, [personal], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Personal creado con exito."});
            }
        })
    }
}

function editarPersonal(req, res) {
    if(connection){
        const { id } = req.params;
        const personal = req.body;

        let sql = "UPDATE personal set ? WHERE id = ?";

        connection.query(sql, [personal, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "Personal actualizado con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )
    }
}

function eliminarPersonal(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM personal WHERE id = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json({error: true, mensaje: "Error al intentar eliminar el personal"});
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Personal no encontrado";
                } else {
                    mensaje = "El personal se ha eliminado exitosamente!";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listarPersonal,
    obtenerPersonal,
    crearPersonal,
    editarPersonal,
    eliminarPersonal
}