import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorias:[],
    categoria:{},
    personal: [],
    persona: {},
    tickets: [],
    ticket: {},
    ticketFiltrado: {},
    loading: false
  },
  mutations: {
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_CATEGORIA(state,categoria){
      state.categoria = categoria;
    },
    SET_PERSONAL(state,personal){
      state.personal = personal;
    },
    SET_PERSONA(state, persona){
      state.persona = persona;
    },
    SET_TICKETS(state,tickets){
      state.tickets = tickets;
      state.ticketFiltrado = tickets;
    },
    SET_TICKET(state, ticket){
      state.ticket = ticket;
    },
    SET_TICKETS_FILTRADOS(state, ticket){
      state.ticketFiltrado = ticket;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    //Categorias
    listarCategorias({commit}){
      commit("SET_LOADING", true);
      
      axios.get('http://localhost:3000/categorias')
      .then( response => {
        commit('SET_CATEGORIAS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    obtenerCategoria({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/categorias/${id}`)
      .then( response => {
        commit('SET_CATEGORIA', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    crearCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/categorias', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/categorias/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    editarCategoria({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/categorias/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },

    //Personal
    listarPersonal({commit}){
      commit("SET_LOADING", true); 
      axios.get('http://localhost:3000/personal')
      .then( response => {
        commit('SET_PERSONAL', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    obtenerPersona({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/personal/${id}`)
      .then( response => {
        commit('SET_PERSONA', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    crearPersona({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/personal', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPersona({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/personal/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    editarPersona({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/personal/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },

    //Tickets
    listarTickets({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/tickets')
      .then( response => {
        commit('SET_TICKETS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    obtenerTicket({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/tickets/${id}`)
      .then( response => {
        commit('SET_TICKET', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    crearTicket({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/tickets', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarTicket({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    editarTicket({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/tickets/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    listarTicketsFiltrados({commit}, {params}){
      commit("SET_TICKETS_FILTRADOS", params);
    }
  },
  modules: {
  }
})
