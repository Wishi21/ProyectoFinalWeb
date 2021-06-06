<template>
  <div class="tickets">
      <b-container>
          <b-row>
              <b-col>
                  <b-button variant="primary" v-b-modal.modal-agregar>Agregar</b-button>
              </b-col>
          </b-row>

           <b-row>
               <Table :items="tickets" :fields="campos" :busy="loading">
                    <template slot="actions" slot-scope="{ item }">
                        <b-button class="me-1" v-b-modal.modal-editar @click="cambiarID(item.item.ID)">Editar</b-button>
                        <b-button @click="onEliminar(item)">Eliminar</b-button> 
                    </template>
                </Table>
          </b-row>          
          <b-modal id="modal-agregar" title="Agregar Ticket" hide-footer>
            <AgregarTicket/>
          </b-modal>
          <b-modal id="modal-editar" title="Editar Ticket" hide-footer>
              <EditarTicket :idActual="idActual" />
          </b-modal>
      </b-container>
  </div>
</template>

<script>
import Table from "../../components/tabla";
import EditarTicket from "./editarTicket";
import AgregarTicket from "./agregarTicket";


import { mapState, mapActions } from "vuex";
export default {
  name: "Tickets",
  components: {
    Table,
    AgregarTicket,
    EditarTicket,
  },
  data() {
    return {
      idActual : Number,
      campos: [
        { key: "ID"},
        { key: "Nombre"},
        { key: "Descripcion"},
        { key: "Prioridad"},
        { key: "Personal"},
        { key: "Categorias"},
        { key: "Estatus"},
        { key: "actions", label: "Acciones" }
      ],
    };
  },
  computed: {
    ...mapState(["tickets", "loading"]),
  },
  methods: {
      ...mapActions(["listarTickets","eliminarTicket"]),
      cambiarID(id){
        this.idActual = id
      },
      onEliminar(item) {
         this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Ticket",
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
            this.eliminarTicket({
            id: item.item.ID,
            onComplete: (response) => {
              this.$notify({
                type: "success",
                title: response.data.mensaje,
              });
              setTimeout(() => this.listarTickets(), 1000);
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
    this.listarTickets();
  },
};
</script>