<template>
  <div>
      <b-form @submit.prevent="guardarCategoria()">
      <Form
        v-model="categoria.ID"
        id="ID"
        titulo="ID"
        class="mb-2"
        disabled="true"
      />    
      <Form
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
import Form from "../../components/form";

export default {
name: 'Editar Categoria',
props: ['idprueba'],
components: {
    Form,
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

        //Guardar
         this.editarCategoria({
          
          id: this.idprueba,
          params: this.categoria,
          onComplete: (response) => {
           
           console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.go()
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
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
        id: this.idprueba,
        onComplete: (response) => {
            Vue.set(this, 'categoria', response.data.data);
            console.log(this.categoria);
        }
    })
    
}
}
</script>