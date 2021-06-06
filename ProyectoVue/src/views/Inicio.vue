<template>
  <div>
        <b-container>  
            <div class="mb-2">Categorias:</div>  
            <select v-model="selected" @change="seleccionCategoria()">
                <option value="0">Todas las categorias</option>
                <option v-for="(categoria, index) in categorias" 
                    :key="index"
                    :value="categoria.ID">
                    {{categoria.Nombre}} 
                </option>
            </select>
            <b-row>
                <b-table id="Tabla" striped hover :items="items"></b-table>
            </b-row>
        </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  export default {
    Name: "Inicio",
    data() {
      return {
          items: [],
          selected:0
      }
    },
    computed: {
        ...mapState(["categorias","tickets"])
    },
    methods:{
        ...mapActions(["listarCategorias","listarTickets"]),
        seleccionCategoria(){
        var Aux = []
        if(this.selected == 0){
            this.items= this.tickets;
            return;
        }
        Object.keys(this.tickets).forEach(key => {
            const tickets = this.tickets[key]
            if (tickets.Categorias == this.selected) {
                Aux = Aux.concat(tickets);
            }
        })
        this.items=Aux;

    }
        
    },
    created(){
        this.listarCategorias();
        this.listarTickets();
        this.items=this.tickets;
    }
  }
</script>