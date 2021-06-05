<template>
  <div>
      <b-form @submit.prevent="guardarPersona()">
        <Input
          v-model="persona.Nombre"
          id="Nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre"
          :maxlength="50"
          :error="erroresValidacion && !validacionNombre"
          mensajeError="Por favor ingrese el nombre"
          class="mb-2"
        />
         <Input
          v-model="persona.Apellidos"
          id="Apellidos"
          titulo="Apellidos"
          placeholder="Ingrese los apellidos"
          :maxlength="80"
          :error="erroresValidacion && !validacionApellidos"
          mensajeError="Por favor ingrese los apellidos"
          class="mb-2"
        />
         <Input
          v-model="persona.Telefono"
          id="Telefono"
          titulo="Telefono"
          placeholder="Ingrese el Telefono"
          :maxlength="10"
          class="mb-2"
        />
         <Input
          v-model="persona.Direccion"
          id="Direccion"
          titulo="Direccion"
          placeholder="Ingrese la direccion"
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
import Input from "../../components/input";

export default {
  name: "Agregar Persona",
  components: {
    Input,
  },
  data() {
    return {
      persona: {
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        Direccion: "", 
      },
      erroresValidacion: false,
    };
  },
  computed: {
    
    validacionNombre() {
      return (
        this.persona.Nombre !== undefined && this.persona.Nombre.trim() !== ""
      );
    },
     validacionApellidos() {
      return (
        this.persona.Apellidos !== undefined && this.persona.Apellidos.trim() !== ""
      );
    }

  },
  methods: {
    ...mapActions(["crearPersona"]),
    guardarPersona() {
      if (this.validacionNombre && this.validacionApellidos) {
        this.erroresValidacion = false;
        //Guardar
        this.crearPersona({
          params: this.persona,
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
};
</script>