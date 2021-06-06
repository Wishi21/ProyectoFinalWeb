<template>
  <div class="tickets">
      <b-container fluid>
          <b-row>
              <b-col>
                  <b-button variant="primary" class="mb-2" v-b-modal.modal-agregar>Agregar</b-button>
              </b-col>
          </b-row>

           <b-row>
               <Table :items="items" :fields="campos" :busy="loading">
                    <template slot="actions" slot-scope="{ item }">
                        <b-row>
                          <b-col>
                            <b-button variant="dark" class="me-1" v-b-modal.modal-editar @click="cambiarID(item.item.ID)">Editar</b-button>
                          </b-col>
                          <b-col>
                            <b-button variant="danger" @click="onEliminar(item)">Eliminar</b-button> 
                          </b-col>
                          <b-col>
                            <b-button variant="warning" class="me-1" v-b-modal.modal-estado @click="cambiarID(item.item.ID)">Estado</b-button>
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
          var Aux = [], nombrePersonal=[], nombreCategoria=[], nombreEstatus="",nombrePrioridad="";
          Object.keys(this.tickets).forEach(key => {
              const ticket = this.tickets[key];
              nombrePersonal = this.personal.filter(function(elem){
                  if(elem.ID == ticket.Personal) return elem;
          });
          nombrePersonal = nombrePersonal[0].Nombre;
            
          nombreCategoria = this.categorias.filter(function(elem){
              if(elem.ID == ticket.Categorias) return elem;
          });
          nombreCategoria = nombreCategoria[0].Nombre;
          
          switch(ticket.Estatus){
              case "ABT":
                  nombreEstatus="Abierto"
                  break;
              case "ESP":
                  nombreEstatus="En Espera"
                  break;
              case "FIN":
                  nombreEstatus="Finalizado"
                  break;
          }
          console.log(ticket.Prioridad);
          switch(ticket.Prioridad){
              case "1":
                  console.log("entro1");
                  nombrePrioridad="BAJA";
                  break;
              case "2":
                  nombrePrioridad="MEDIA";
                  break;
              case "3":
                  nombrePrioridad="ALTA";
                  break;
          }
          Aux = Aux.concat({
              Nombre: ticket.Nombre,
              Descripcion: ticket.Descripcion,
              Prioridad: nombrePrioridad,
              Personal: nombrePersonal,
              Categorias: nombreCategoria,
              Estatus: nombreEstatus,
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