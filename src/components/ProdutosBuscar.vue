<template>
  <div>
    <form>
      <input
        name="busca"
        id="busca"
        type="text"
        v-model="busca"
        placeholder="Buscar..."
      />
      <input
        type="submit"
        id="lupa"
        value="Buscar"
        @click.prevent="buscarProduto"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "ProdutosBuscar",
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    buscarProduto() {
      this.$router.push({ query: { q: this.busca } });
    },
  },
};
</script>

<style scoped>
form {
  position: relative;
  max-width: 600px;
  margin: 30px auto 60px auto;
  padding: 0 10px;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 57px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  box-shadow: none;
}
</style>
