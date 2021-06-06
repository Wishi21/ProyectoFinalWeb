<template>
  <div class="personal">
      <b-container>
          <b-row>
              <b-col>
                  <b-button variant="primary" class="mb-2" v-b-modal.modal-agregar>Agregar</b-button>
              </b-col>
          </b-row>

           <b-row>
               <Table :items="personal" :fields="campos" :busy="loading">
                    <template slot="actions" slot-scope="{ item }">
                        <b-button variant="dark" class="me-1" v-b-modal.modal-editar @click="cambiarID(item.item.ID)">Editar</b-button>
                        <b-button variant="danger" @click="onEliminar(item)">Eliminar</b-button> 
                    </template>
                </Table>
          </b-row>          
          <b-modal id="modal-agregar" title="Agregar Personal" hide-footer>
            <AgregarPersonal/>
          </b-modal>
          <b-modal id="modal-editar" title="Editar Personal" hide-footer>
              <EditarPersonal :idActual="idActual" />
          </b-modal>
      </b-container>
  </div>
</template>

<script>
import Table from "../../components/tabla";
import EditarPersonal from "./editarPersonal";
import AgregarPersonal from "./agregarPersonal";


import { mapState, mapActions } from "vuex";
export default {
  name: "Personal",
  components: {
    Table,
    AgregarPersonal,
    EditarPersonal,
  },
  data() {
    return {
      idActual : Number,
      campos: [
        { key: "ID"},
        { key: "Nombre"},
        { key: "Apellidos"},
        { key: "Telefono"},
        { key: "Direccion"},
        { key: "actions", label: "Acciones" }
      ],
    };
  },
  computed: {
    ...mapState(["personal", "loading"]),
  },
  methods: {
      ...mapActions(["listarPersonal","eliminarPersona"]),
      cambiarID(id){
        this.idActual = id
      },
      onEliminar(item) {
         this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Personal",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarPersona({
            id: item.item.ID,
            onComplete: (response) => {
              this.$notify({
                type: "success",
                title: response.data.mensaje,
              });
              setTimeout(() => this.listarPersonal(), 1000);
            },
          });
        }
      })
      .catch((error) => {
        this.$notify({
          type: "error",
          title: error.data.mensaje
        })
      });
    }
  },
  mounted() {
    this.listarPersonal();
  },
};
</script>
