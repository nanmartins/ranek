<template>
  <section>
    <h2>Endereço de envio</h2>

    <ErroNotificacao :erros="erros" />

    <UsuarioForm>
      <button @click.prevent="finalizarCompra" class="btn">
        Finalizar Compra
      </button>
    </UsuarioForm>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { mapState } from "vuex";

import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "FinalizarCompra",
  props: ["produto"],
  components: {
    UsuarioForm,
  },

  data() {
    return {
      erros: [],
    };
  },

  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        },
      };
    },
  },

  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "compras" });
      });
    },

    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        await this.criarTransacao();
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },

    finalizarCompra() {
      this.erros = [];
      if (this.$store.state.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 40px auto 20px auto;
}

.btn {
  background: #e80;
}
</style>
