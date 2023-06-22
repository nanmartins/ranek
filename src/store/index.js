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
    },
    usuario_produtos: null
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
    },

    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload
    },

    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload)
    }
  },
  actions: {
    getUsuario(context) {
      return api.get('/usuario')
        .then(response => {
          context.commit('UPDATE_USUARIO', response.data)
          context.commit('UPDATE_LOGIN', true)
        })
    },

    criarUsuario(context, payload) {
      context.commit('UPDATE_USUARIO', { id: payload.email })
      return api.post('/usuario', payload)
    },

    deslogarUsuario(context) {
      context.commit('UPDATE_USUARIO', {
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
      })
      window.localStorage.removeItem('token')
      context.commit('UPDATE_LOGIN', false)
    },

    getUsuarioProdutos(context) {
      api.get(`/produto?usuario_id=${context.state.usuario.id}`)
        .then(response => {
          context.commit('UPDATE_USUARIO_PRODUTOS', response.data)
        })
    },

    logarUsuario(context, payload) {
      return api.login({
        username: payload.email,
        password: payload.senha
      })
        .then(response => {
          window.localStorage.token = `Bearer ${response.data.token}`
        })
    }
  },
  modules: {
  }
})
