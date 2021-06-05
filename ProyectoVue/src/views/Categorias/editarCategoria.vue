<template>
  <div>
      <b-form @submit.prevent="guardarCategoria()">
      <Input
        v-model="categoria.ID"
        id="ID"
        titulo="ID"
        class="mb-2"
        :disabled="true"
      />    
      <Input
        v-model="categoria.Nombre"
        id="Nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre de la categoria"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre de la categoria"
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
import Vue from 'vue';
import { mapActions} from 'vuex';
import Input from "../../components/input";

export default {
name: 'EditarCategoria',
props: ['idActual'],
components: {
    Input,
  },
  data() {
    return {
      categoria: {
        ID: "",
        Nombre: ""
      },
      erroresValidacion: false,
    };
  },
computed: {
    validacionNombre() {
      return (
        this.categoria.Nombre !== undefined && this.categoria.Nombre.trim() !== "" && this.categoria.Nombre.length<=50
      );
    }
},
methods: {
    ...mapActions(['obtenerCategoria', 'editarCategoria']),
    guardarCategoria() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        
         this.editarCategoria({
          id: this.idActual,
          params: this.categoria,
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
    }
},
created() {
    this.obtenerCategoria({
        id: this.idActual,
        onComplete: (response) => {
            Vue.set(this, 'categoria', response.data.data);
        }
    })
    
}
}
</script>