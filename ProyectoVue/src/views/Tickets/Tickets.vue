<template>
  <div class="tickets">
      <b-container fluid>
          <b-row>
              <b-col>
                  <b-button variant="primary" v-b-modal.modal-agregar>Agregar</b-button>
              </b-col>
          </b-row>

           <b-row>
               <Table :items="tickets" :fields="campos" :busy="loading">
                    <template slot="actions" slot-scope="{ item }">
                        <b-row>
                          <b-col>
                            <b-button class="me-1" v-b-modal.modal-editar @click="cambiarID(item.item.ID)">Editar</b-button>
                          </b-col>
                          <b-col>
                            <b-button @click="onEliminar(item)">Eliminar</b-button> 
                          </b-col>
                          <b-col>
                            <b-button class="me-1" v-b-modal.modal-estado @click="cambiarID(item.item.ID)">Estado</b-button>
                          </b-col>
                        </b-row>
                    </template>
                </Table>
          </b-row>          
          <b-modal id="modal-agregar" title="Agregar Ticket" hide-footer>
            <AgregarTicket/>
          </b-modal>
          <b-modal id="modal-editar" title="Editar Ticket" hide-footer>
              <EditarTicket :idActual="idActual" />
          </b-modal>
          <b-modal id="modal-estado" title="Editar Estado" hide-footer>
              <EstatusTicket :idActual="idActual" />
          </b-modal>
      </b-container>
  </div>
</template>

<script>
import Table from "../../components/tabla";
import EditarTicket from "./editarTicket";
import AgregarTicket from "./agregarTicket";
import EstatusTicket from "./estatusTicket";


import { mapState, mapActions } from "vuex";
export default {
  name: "Tickets",
  components: {
    Table,
    AgregarTicket,
    EditarTicket,
    EstatusTicket
  },
  data() {
    return {
      items : [],
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
    ...mapState(["tickets", "loading","personal","categorias"]),
  },
  methods: {
      ...mapActions(["listarTickets","eliminarTicket","listarPersonal","listarCategorias"]),
      editarTabla() {
        var Aux = [];
        Object.keys(this.tickets).forEach(key => {
            const ticket = this.tickets[key];
            var nombrePersonal = this.personal.filter(function(elem){
              if(elem.ID == ticket.Personal) return elem[0];
            });
            console.log("---------------")
            console.log(nombrePersonal);
            Aux = Aux.concat({
                Nombre: "",
                Descripcion: "",
                Prioridad: '0',
                Personal: nombrePersonal,
                Categorias: "",
                Estatus: "ABT",
                });
        })
        this.items=Aux;
    },
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
    this.listarPersonal();
    this.listarCategorias();
    this.listarTickets();
    this.editarTabla();
  },
};
</script>