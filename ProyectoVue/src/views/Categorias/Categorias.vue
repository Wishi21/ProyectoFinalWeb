<template>
  <div class="categorias">
      <b-container>
          <b-row>
              <b-col>
                  <b-button variant="primary" class="mb-2" v-b-modal.modal-1>Agregar</b-button>
              </b-col>
          </b-row>

           <b-row>
               <Table :items="categorias" :fields="campos" :busy="loading">
                    <template slot="actions" slot-scope="{ item }">
                        <b-button variant="danger" @click="onEliminar(item)">Eliminar</b-button> 
                    </template>
                </Table>
          </b-row>
          
          <b-modal id="modal-1" title="Agregar Categorias" hide-footer>
            <AgregarCategoria/>
          </b-modal>
            
          

      </b-container>
  </div>
</template>

<script>
import Table from "../../components/tabla";
import AgregarCategoria from "./agregarCategoria";


import { mapState, mapActions } from "vuex";
export default {
  name: "Categorias",
  components: {
    Table,
    AgregarCategoria
  },
  data() {
    return {
      idActual : Number,
      campos: [
        { key: "ID"},
        { key: "Nombre"},
        { key: "actions", label: "Accion" }
      ],
    };
  },
  computed: {
    ...mapState(["categorias", "loading"]),
  },
  methods: {
      ...mapActions(["listarCategorias","eliminarCategoria"]),
      cambiarID(id){
        this.idActual = id
      },
      onEliminar(item) {
         this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Categoria",
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
            this.eliminarCategoria({
            id: item.item.ID,
            onComplete: (response) => {
              this.$notify({
                type: "success",
                title: response.data.mensaje,
              });
              setTimeout(() => this.listarCategorias(), 1000);
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
    this.listarCategorias();
  },
};
</script>