<template>
    <div>
        <b-card>
            <b-row v-for="(ticket, index) in items"
            :key= index
             v-bind:class='{ 
                 "alert alert-danger": ticket.Estatus == "ESP", 
                 "alert alert-success": ticket.Estatus == "ABT", 
                 "alert alert-secondary ": ticket.Estatus == "FIN"
            }'
            >
                <label>Nombre: {{ticket.Nombre}}</label>
                <label>Descripcion: {{ticket.Descripcion}}</label>
                <label>Prioridad: {{ticket.Prioridad}}</label>
                <label>Personal: {{ticket.NombrePersonal}}</label>
                <label>Categoria: {{ticket.NombreCategoria}}</label>
                <label>Estatus: {{ticket.Estatus}}</label>
            </b-row>        
        </b-card>
    </div>    
</template>

<script>
export default {
    name: 'tarjeta',
    props: [
        "items"
    ],
    data:{
        colorAbierto: "danger",
        colorEspera: "success ",
        colorFinalizado:"info"
    }
}
</script>