<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input v-model="produto.nome" type="text" id="nome" name="nome">
    <!-- Preco -->
    <label for="preco">Preco (R$)</label>
    <input v-model="produto.preco" type="number" id="preco" name="preco">
    <!-- Descricao -->
    <label for="descricao">Descricao</label>
    <textarea v-model="produto.descricao" id="descricao" name="descricao"></textarea>
    <!-- Fotos -->
    <label for="fotos">Fotos</label>
    <input ref="fotos" type="file" id="fotos" name="fotos">

    <input @click.prevent="adicionarProduto" type="button" value="Adicionar Produto" class="btn">
  </form>
</template>

<script>

import { api } from '@/services.js'

export default {
  name: 'ProdutoAdicionar',
  data() {
    return {
      produto: {
        nome: '',
        preco: '',
        descricao: '',
        fotos: null
      }
    }
  },

  methods: {
    formatarProduto() {
      this.produto.usuario_id = this.$store.state.usuario.id
    },

    adicionarProduto() {
      this.formatarProduto()
      api.post('/produto', this.produto)
      .then(() => {
        this.$store.dispatch('getUsuarioProdutos')
      })
    }
  }
}
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
