<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar v-if="usuario.id" />
    <p v-else>Conecte-se para adicionar um produto</p>

    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button @click="deletarProduto(produto.id)" class="deletar">Deletar</button>
        </ProdutoItem>
      </li>
    </transition-group>

  </section>
</template>

<script>

import { mapState, mapActions } from "vuex";
import { api } from '@/services.js'

import ProdutoItem from '@/components/ProdutoItem.vue'
import ProdutoAdicionar from '@/components/ProdutoAdicionar.vue'

export default {
  name: 'UsuarioProdutos',
  components: {
    ProdutoAdicionar,
    ProdutoItem
  },

  computed: {
    ...mapState(['login', 'usuario', 'usuario_produtos'])
  },

  methods: {
    ...mapActions(['getUsuarioProdutos']),
    deletarProduto(id) {
      const confirmar = window.confirm('Deseja remover este produto?')
      if (confirmar) {
        api.delete(`/produto/${id}`)
        .then(() => {
          this.getUsuarioProdutos()
        }).catch(error => {
          console.log(error.response)
        })
      }
    }
  },

  watch: {
    login() {
      this.getUsuarioProdutos()
    }
  },

  created() {
    // this.$store.dispatch('getUsuarioProdutos')
    if (this.login) {
      this.getUsuarioProdutos()
    }
  }
}
</script>

<style scoped>

h2 {
  margin-bottom: 20px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter,
.list-leave-to {
  transform: translate3d(20px, 0, 0);
  opacity: 1;
}

.deletar {
  position: absolute;
  top: 0;
  right: 0;
  background: url('../../assets/remove.svg') no-repeat center center;
  width: 20px;
  height: 20px;
  text-indent: -140px;
  overflow: hidden;
  border: none;
}

</style>
