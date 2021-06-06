<template>
    <div>
        <b-card>
            <div v-for="(ticket, index) in items"
            :key= index
             v-bind:class='{ 
                 "alert alert-danger": ticket.Estatus == "ESP", 
                 "alert alert-success": ticket.Estatus == "ABT", 
                 "alert alert-secondary ": ticket.Estatus == "FIN"
            }'
            >
                <label>{{ticket.Nombre}}</label>
                <label>{{ticket.Descripcion}}</label>
                <label>{{ticket.Prioridad}}</label>
                <label>{{ticket.Personal}}</label>
                <label>{{ticket.Categorias}}</label>
                <label>{{ticket.Estatus}}</label>
            </div>        
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