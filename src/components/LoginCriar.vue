<template>
  <div>
    <section>
      <h2>Crie sua conta</h2>

      <ErroNotificacao :erros="erros" />

      <transition mode="out-in">
        <button v-if="!criar" @click="criar = true" class="btn">Criar</button>

        <UsuarioForm v-else>
          <button class="btn btn-form" @click.prevent="criarUsuario">
            Criar conta
          </button>
        </UsuarioForm>
      </transition>
    </section>
  </div>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      criar: false,
      erros: [],
    };
  },

  methods: {
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        this.$router.push({ name: "usuario" });
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 40px auto 10px auto;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
