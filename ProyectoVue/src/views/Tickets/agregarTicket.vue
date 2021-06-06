<template>
  <div>
      <b-form @submit.prevent="guardarTicket()">
        <Input
          v-model="ticket.Nombre"
          id="Nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre"
          :maxlength="50"
          :error="erroresValidacion && !validacionNombre"
          mensajeError="Por favor ingrese el nombre del ticket"
          class="mb-2"
        />

        <Input
          v-model="ticket.Descripcion"
          id="Descripcion"
          titulo="Descripcion"
          placeholder="Ingrese la descripcion"
          :maxlength="100"
          class="mb-2"
        />

        <div>
            <label> Prioridad: </label> <br>
            <b-form-select
                v-model="ticket.Prioridad" 
                :options = "prioridades"
            /> <br>
            <label 
                v-if="erroresValidacion && !validacionPrioridad" 
                class="text-danger mb-2">
                    Necesario seleccionar la prioridad
            </label>
        </div>  

        
        <div>  
            <label>Personal:</label><br>
            <b-form-select
                v-model="ticket.Personal" 
                :options = "personalSelect"
                text-field = "Nombre"
                value-field = "ID"
                class="mb-2"
            /><br>
            <label
                v-if="erroresValidacion && !validacionPersonal" 
                class="text-danger">
                    Necesario seleccionar el personal
            </label>
        </div>  

        <div>  
            <label>Categoria:</label><br>
            <b-form-select
                v-model="ticket.Categorias" 
                :options = "categorias"
                text-field = "Nombre"
                value-field = "ID"
                class="mb-2"
            /><br>
            <label
                v-if="erroresValidacion && !validacionCategorias" 
                class="text-danger">
                    Necesario seleccionar la categoria
            </label>
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
import { mapActions, mapState } from "vuex";
import Input from '../../components/input.vue';

export default {
  name: "Agregar Ticket",
  components: {
    Input,
  },

  data() {
    return {
      prioridades: [
          { value: '0', text: 'Selecciona una prioridad' },
          { value: '1', text: 'Baja' },
          { value: '2', text: 'Media' },
          { value: '3', text: 'Alta'}
      ],
      personalSelect: [],

      ticket: {
        Nombre: "",
        Descripcion: "",
        Prioridad: '0',
        Personal: "",
        Categorias: "",
        Estatus: "ABT"
        },

        erroresValidacion: false
      
    };
  },
  computed: {
    
    ...mapState(["personal","categorias"]),

    validacionNombre() {
      return (
        this.ticket.Nombre !== undefined && this.ticket.Nombre.trim() !== ""
      );
    },
    validacionPrioridad() {
      return (
        this.ticket.Prioridad != 0
      );
    },
    validacionPersonal() {
        return (  
            this.ticket.Personal !== ""
        );
    },
    validacionCategorias() {
      return (
        this.ticket.Categorias !== ""
      );
    },

  },
  methods: {
    ...mapActions(["crearTicket","listarPersonal","listarCategorias"]),
    concatenarNombre() {
        var Aux = [];
        Object.keys(this.personal).forEach(key => {
            const personal = this.personal[key];
            Aux = Aux.concat({
                ID:personal.ID,
                Nombre:personal.Nombre.concat(" ".concat(personal.Apellidos))
                });
        })
        this.personalSelect=Aux;
    },
    guardarTicket() {
      if (this.validacionNombre && this.validacionPrioridad && this.validacionPersonal && this.validacionCategorias) {
        this.erroresValidacion = false;
        //Guardar
        this.crearTicket({
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
      } else {
        this.erroresValidacion = true;
      }
    },
  },
  created() {
      this.listarPersonal();
      this.listarCategorias();
      this.concatenarNombre();
  }
};
</script>