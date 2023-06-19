<template>
  <section>
    <UsuarioForm>
      <button @click.prevent="atualizarUsuario" class="btn">Salvar</button>
    </UsuarioForm>
  </section>
</template>

<script>

import { api } from '@/services.js'

import UsuarioForm from '@/components/UsuarioForm.vue'

export default {
  name: 'UsuarioEditar',
  components: {
    UsuarioForm
  },

  methods: {
    async atualizarUsuario() {
      await api.put(`/usuario/${this.$store.state.usuario.id}`, this.$store.state.usuario)
      .then(() => {
        this.$store.dispatch('getUsuario')
        this.$router.push({ name: 'usuario'})
      }).catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style>

</style>
