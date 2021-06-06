<template>
  <div>
      <b-form @submit.prevent="guardarTicket()">
        <Input
        v-model="ticket.ID"
        id="ID"
        titulo="ID"
        class="mb-2"
        :disabled="true"
        /> 

        <div>
            <label> Estatus: </label> <br>
            <b-form-select
                v-model="ticket.Estatus" 
                :options = "estatus"
            /> <br>
        </div>  

        <b-row align-h="end">
          <b-col cols="3">
           <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
          </b-col>
        </b-row>
      </b-form>
      
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Vue from 'vue';
import Input from '../../components/input.vue';

export default {
  name: "Estatus Ticket",
  props: ["idActual"],
  components: {
    Input,
  },

  data() {
    return {
      estatus: [
          { value: 'ABT', text: 'Abierto' },
          { value: 'ESP', text: 'En Espera' },
          { value: 'FIN', text: 'Finalizado'}
      ],
      ticket: {
        ID: "",
        Nombre: "",
        Descripcion: "",
        Prioridad: "",
        Personal: "",
        Categorias: "",
        Estatus: ""
        }
    };
  },
  methods: {
    ...mapActions(["obtenerTicket","editarTicket"]),
    guardarTicket() {
        //Guardar
        this.editarTicket({
          id: this.idActual,
          params: this.ticket,
          onComplete: (response) => {
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.go()
          },
          onError: (error) => {
              this.$notify({
              type: 'error', 
              title: error.response.data.mensaje,
            });
          },
        });
    },
  },
  created() {
      console.log(this.idActual);
      this.obtenerTicket({
        id: this.idActual,
        onComplete: (response) => {
            Vue.set(this, 'ticket', response.data.data);
        }
    })
  }
};
</script>