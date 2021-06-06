<template>
  <div>
        <b-container>  
            <div class="mb-2">Categorias:</div>  
            <select v-model="selected" class="mb-3" @change="seleccionCategoria()">
                <option value="0">Todas las categorias</option>
                <option v-for="(categoria, index) in categorias" 
                    :key="index"
                    :value="categoria.ID"
                    >             
                        {{categoria.Nombre}} 
                </option>
            </select>
            <b-row>
                <Tarjeta :items="ticketFiltrado">  </Tarjeta>
                <!--<b-table id="Tabla" striped hover :items="items"></b-table> -->
            </b-row>
        </b-container>
  </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Tarjeta from "../components/tarjeta";
    export default {
        Name: "Inicio",
        components: {
            Tarjeta
        },
        data() {
            return {
                ticketAux:"",
                selected:0
            }
        },
        computed: {
            ...mapState(["categorias","tickets","ticketFiltrado"])
        },
        methods:{
            ...mapActions(["listarCategorias","listarTickets","listarPersonal","filtrarTickets","listarTicketsFiltrados"]),
            seleccionCategoria(){
                console.log(this.ticketAux)
                var Aux = [],ticket="";
                if(this.selected =="0"){
                    this.listarTicketsFiltrados({params: this.tickets});
                    return;
                }
                Object.keys(this.tickets).forEach(key => {
                    ticket = this.tickets[key]
                    if (ticket.Categorias == this.selected) {
                        Aux = Aux.concat(ticket);
                    }
                })
                this.listarTicketsFiltrados({params: Aux});
            }
        },
        mounted(){
            this.listarPersonal();
            this.listarCategorias();
            this.listarTickets();
        },
    }
</script>