import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorias:[],
    categoria:{},
    loading: false
  },
  mutations: {
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_CATEGORIA(state,categoria){
      state.categoria = categoria;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    setCategorias({commit}){
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
    }
  },
  modules: {
  }
})
