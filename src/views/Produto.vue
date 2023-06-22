<template>
  <div>
    <section>
      <div v-if="produto" class="produto">
        <ul v-if="produto.fotos" class="fotos">
          <li v-for="(foto, index) in produto.fotos" :key="index">
            <img :src="foto.src" :alt="foto.titulo" />
          </li>
        </ul>

        <div class="info">
          <h1>{{ produto.nome }}</h1>
          <p class="preco">{{ produto.preco | numeroPreco }}</p>
          <p class="descricao">{{ produto.descricao }}</p>

          <transition v-if="produto.vendido === 'false'" mode="out-in">
            <button v-if="!finalizar" @click="finalizar = true" class="btn">
              Comprar
            </button>
            <FinalizarCompra v-else :produto="produto" />
          </transition>

          <button v-else disable class="btn btn-disabled">Indisponivel</button>
        </div>
      </div>

      <PaginaCarregando v-else />
    </section>
  </div>
</template>

<script>
import { api } from "@/services.js";

import FinalizarCompra from "@/components/FinalizarCompra.vue";

export default {
  name: "Produto",
  props: ["id"],
  components: {
    FinalizarCompra,
  },
  data() {
    return {
      produto: null,
      finalizar: false,
    };
  },
  methods: {
    getProduto() {
      api.get(`/produto/${this.id}`).then((response) => {
        this.produto = response.data;
      });
    },
  },
  created() {
    this.getProduto();
  },
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.fotos {
  grid-row: 1 / 3;
}

.info {
  position: sticky;
  top: 40px;
}

img {
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
}

.preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.descricao {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}
</style>
