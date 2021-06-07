const connection = require('../config/connection');


function listarTickets(req, res) {
    if(connection) {
        //trae tambien los nombres de categoria y personal
        let sql = "SELECT T.*,CONCAT(P.Nombre,' ',P.Apellidos) as NombrePersonal, C.Nombre as NombreCategoria FROM tickets as T INNER JOIN personal as P ON T.Personal = P.ID INNER JOIN categorias as C ON T.Categorias = C.ID ORDER BY ID;";
        connection.query(sql, (err, tickets) => {
            if(err) {
                res.json(err);
            } else {
                console.log(tickets);
                res.json(tickets);
            }
        });
    }
}

function obtenerTicket(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM tickets WHERE id = ${connection.escape(id)}`;
        connection.query(sql, (err, tickets) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(tickets === undefined || tickets.length == 0)
                mensaje1 = "Ticket no encontrado";

                res.json({data: tickets[0], mensaje: mensaje1});
            }
        })
    }

}

function crearTicket(req, res){
    if(connection){
        console.log(req.body);
        const tickets = req.body;
        if(!tickets.Nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(!tickets.Prioridad){
            return res.status(400).send({error: true, mensaje: "La prioridad es obligatoria"});
        }

        if(!tickets.Personal){
            return res.status(400).send({error: true, mensaje: "El personal es obligatorio"});
        }

        if(!tickets.Categorias){
            return res.status(400).send({error: true, mensaje: "La categoria es obligatoria"});
        }

        if(!tickets.Estatus){
            return res.status(400).send({error: true, mensaje: "El estatus es obligatorio"});
        }

        if(tickets.Nombre.length > 50){
            return res.status(400).send({error: true, mensaje: "La longitud maxima de Nombre es de 50 caracteres"});
        }

        if(tickets.Descripcion && tickets.Descripcion.length > 100){
            return res.status(400).send({error: true, mensaje: "La longitud maxima de la descripcion es de 100 caracteres"});
        }

        let sql = "INSERT INTO tickets set ?";

        connection.query(sql, [tickets], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Ticket creado con exito."});
            }
        })
    }
}

function editarTicket(req, res) {
    if(connection){
        const { id } = req.params;
        const ticket = req.body;

        let sql = "UPDATE tickets set ? WHERE id = ?";

        connection.query(sql, [ticket, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "Ticket actualizado con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )


    }
}

function eliminarTicket(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM tickets WHERE id = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Ticket no encontrado";
                } else {
                    mensaje = "El Ticket se elimino con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listarTickets,
    obtenerTicket,
    crearTicket,
    editarTicket,
    eliminarTicket
}