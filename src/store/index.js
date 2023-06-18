import { api } from '@/services'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    strict: true,
    login: false,
    usuario: {
      id: '',
      nome: '',
      email: '',
      senha: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  },
  getters: {
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload
    },

    UPDATE_USUARIO(state, payload) {
      // unindo os valores do objeto state.usuario com os valores recebidos user form
      // assim mantendo o usuario objeto com os valores nulos ate que receba algum valor do form
      state.usuario = Object.assign(state.usuario, payload)
    }
  },
  actions: {
    getUsuario(context, payload) {
      api.get(`/usuario/${payload}`)
      .then(response => {
        context.commit('UPDATE_USUARIO', response.data)
        context.commit('UPDATE_LOGIN', true)
      })
    }
  },
  modules: {
  }
})
