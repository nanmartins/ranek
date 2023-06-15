<template>
  <div class="paginas">

    <ul v-if="paginasTotal > 1">

      <!-- <router-link v-if="this.$route.query._page > 1" :to="{ query: query(1) }">&lt;&lt;</router-link> -->

      <li v-for="(pagina) in paginas" :key="pagina">
        <router-link :to="{ query: query(pagina) }">{{ pagina }}</router-link>
      </li>

      <!-- <router-link v-if="this.$route.query._page < this.paginasTotal" :to="{ query: query(paginasTotal) }">&gt;&gt;</router-link> -->

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
    paginas() {
      const current = Number(this.$route.query._page)
      const range = 9
      const offset = Math.ceil(range / 2)
      const total = this.paginasTotal
      const pagesArray = []

      for(let i = 1; i <= total; i++) {
        pagesArray.push(i)
      }

      pagesArray.splice(0, current - offset)
      pagesArray.splice(range, total)

      return pagesArray
    },

    paginasTotal() {
      // console.log(this.paginas)
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

li:nth-child(1) a {
  padding: 2px 10px 2px 9px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}

</style>
