const mysql = require('mysql');

const objectConnection = {
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "Co1234567",
    "database": "crud_node"
}

// Crear conexion
const myConn = mysql.createConnection(objectConnection);

// Conectar
myConn.connect((error) => {
    if(error) {
        console.log("Error bd: ", error);
    } else {
        console.log("Base de datos conectada");
    }
});

module.exports = myConn;
