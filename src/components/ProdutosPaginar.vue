<template>
  <div class="paginas">
    <!-- <p>Paginas {{ this.$route.query._page }} de {{ this.paginasTotal }}</p> -->
    <ul v-if="paginasTotal > 1">
      <li v-for="(pagina) in paginasTotal" :key="pagina">
        <router-link :to="{ query: query(pagina)}">{{ pagina }}</router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProdutosPaginar',
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    }
  },
  methods: {
    query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina
      }
    }
  },
  computed: {
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina
      return (total !== Infinity) ? Math.ceil(total) : 0
    }
  }
}
</script>

<style scoped>

ul {
  text-align: center;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li:first-child a {
  padding: 2px 10px 2px 8px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}

</style>
