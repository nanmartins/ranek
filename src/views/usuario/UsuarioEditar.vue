<template>
  <section>
    <UsuarioForm>
      <button @click.prevent="atualizarUsuario" class="btn">Salvar</button>
    </UsuarioForm>

    <ErroNotificacao :erros="erros" />
  </section>
</template>

<script>
import { api } from "@/services.js";

import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
  },

  data() {
    return {
      erros: [],
    };
  },

  methods: {
    async atualizarUsuario() {
      this.erros = [];
      await api
        .put(`/usuario`, this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "usuario" });
        })
        .catch((error) => {
          this.erros.push(error.response.data.message);
        });
    },
  },
};
</script>

<style>
</style>
