<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div v-for="produto in produtos" :key="produto.id" class="produto">
          <router-link :to="{ name: 'produto', params: { id: produto.id } }">
            <p class="preco">{{ produto.preco | numeroPreco }}</p>
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
            />
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p class="descricao">{{ produto.descricao }}</p>
          </router-link>
        </div>

        <!-- <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina" /> -->
      </div>

      <div v-else-if="produtos && produtos.length === 0" key="sem-resultado">
        <p class="sem-resultados">Busca sem resultados.</p>
      </div>

      <PaginaCarregando v-else key="carregando" />
    </transition>

    <ProdutosPaginar
      :produtosTotal="produtosTotal"
      :produtosPorPagina="produtosPorPagina"
    />
  </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";

import ProdutosPaginar from "@/components/ProdutosPaginar.vue";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar,
  },
  data() {
    return {
      produtos: null,
      produtosPorPagina: 9,
      produtosTotal: 0,
    };
  },

  computed: {
    url() {
      const query = serialize(this.$route.query);
      // console.log(query)
      return `/produto?_limit=${this.produtosPorPagina}${query}`;
    },

    isHome() {
      return this.$route.path === "/";
    },
  },

  methods: {
    getProdutos() {
      this.produtos = null;
      window.setTimeout(() => {
        api.get(this.url).then((response) => {
          this.produtosTotal = Number(response.headers["x-total-count"]);
          // console.log(response)
          this.produtos = response.data;
        });
      }, 1000);
    },
  },

  watch: {
    url() {
      this.getProdutos();
    },
  },

  created() {
    this.getProdutos();
  },
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 600px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 10px;
  }
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.3s;
  margin-top: 40px;
}

.produto:hover {
  box-shadow: 0 8px 14px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
  margin-top: 30px;
}
</style>
