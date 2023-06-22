<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input v-model="produto.nome" type="text" id="nome" name="nome" />
    <!-- Preco -->
    <label for="preco">Preco (R$)</label>
    <input v-model="produto.preco" type="number" id="preco" name="preco" />
    <!-- Descricao -->
    <label for="descricao">Descricao</label>
    <textarea
      v-model="produto.descricao"
      id="descricao"
      name="descricao"
    ></textarea>
    <!-- Fotos -->
    <label for="fotos">Fotos</label>
    <input ref="fotos" type="file" id="fotos" name="fotos" multiple />

    <input
      @click.prevent="adicionarProduto"
      type="button"
      value="Adicionar Produto"
      class="btn"
    />
  </form>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "ProdutoAdicionar",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false",
      },
    };
  },

  methods: {
    formatarProduto() {
      const form = new FormData();

      const files = this.$refs.fotos.files;
      console.log(files);

      for (let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append("nome", this.produto.nome);
      form.append("preco", this.produto.preco);
      form.append("descricao", this.produto.descricao);
      form.append("vendido", this.produto.vendido);
      form.append("usuario_id", this.$store.state.usuario.id);

      return form;
    },

    adicionarProduto() {
      const produto = this.formatarProduto();
      api.post("/produto", produto).then(() => {
        this.$store.dispatch("getUsuarioProdutos");
      });
    },
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
