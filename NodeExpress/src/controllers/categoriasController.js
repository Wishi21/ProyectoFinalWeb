const connection = require('../config/connection');


function listar(req, res) {
    if(connection) {
        let sql = "SELECT * FROM categorias";
        connection.query(sql, (err, categorias) => {
            if(err) {
                res.json(err);
            } else {
                console.log(categorias);
                res.json(categorias);
            }
        });
    }
}

function obtenerCategorias(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM categorias WHERE id = ${connection.escape(id)}`;
        connection.query(sql, (err, categorias) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(categorias === undefined || categorias.length == 0)
                mensaje1 = "Categoria no encontrada";

                res.json({data: categorias[0], mensaje: mensaje1});
            }
        })
    }

}

function crear(req, res){
    if(connection){
        console.log(req.body);
        const categorias = req.body;
        if(!categorias.Nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(categorias.length > 50){
            return res.status(400).send({error: true, mensaje: "La longitud maxima es de 50 caracteres"});
        }

        let sql = "INSERT INTO categorias set ?";

        connection.query(sql, [categorias], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "categorias creada con exito."});
            }
        })
    }
}

function editar(req, res) {
    if(connection){
        const { id } = req.params;
        const categorias = req.body;

        let sql = "UPDATE categorias set ? WHERE id = ?";

        connection.query(sql, [categorias, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "categorias actualizada con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )


    }
}

function eliminar(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM categorias WHERE id = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "categorias no encontrada";
                } else {
                    mensaje = "categorias elimina con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listar,
    obtenerCategorias,
    crear,
    editar,
    eliminar
}