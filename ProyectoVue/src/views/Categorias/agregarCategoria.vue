<template>
  <div>
      <b-form @submit.prevent="guardarCategoria()">
        <Input
          v-model="categoria.Nombre"
          id="Nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre"
          :maxlength="50"
          :error="erroresValidacion && !validacionNombre"
          mensajeError="Por favor ingrese el nombre de la categoria"
          class="mb-2"
        />
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
import Input from '../../components/input.vue';

export default {
  name: "Agregar Categoria",
  components: {
    Input,
  },

  data() {
    return {
      categoria: {
        Nombre: "" 
      },
      erroresValidacion: false,
    };
  },
  computed: {
    
    validacionNombre() {
      return (
        this.categoria.Nombre !== undefined && this.categoria.Nombre.trim() !== ""
      );
    }
  },
  methods: {
    ...mapActions(["crearCategoria"]),
    guardarCategoria() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;

        //Guardar
        this.crearCategoria({
          params: this.categoria,
          onComplete: (response) => {
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            setTimeout(() => this.$router.go(), 1000);
            
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
};
</script>