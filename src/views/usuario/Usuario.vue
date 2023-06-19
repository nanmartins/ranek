<template>
  <section class="usuario">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{ name: 'usuario'}">Produtos</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'compras'}">Compras</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'vendas'}">Vendas</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'usuario-editar' }">Editar Perfil</router-link>
        </li>

        <li>
          <button @click.prevent="deslogar">Deslogar</button>
        </li>
      </ul>
    </nav>

    <transition mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- <p>{{ $store.state.usuario }}</p> -->
  </section>
</template>

<script>
export default {
  name: 'Usuario',
  methods: {
    deslogar() {
      this.$store.dispatch('deslogarUsuario')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.usuario {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  gap: 30px;
}

.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  border-radius: 4px;
  margin-bottom: 5px;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #84f;
  color: #fff;
}

.sidenav button {
  font-family: 'Rajdhani', sans-serif, monospace, Helvetica, Arial;
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
}


@media screen and (max-width: 500px) {
  .usuario {
    grid-template-columns: 1fr;
    margin: 0 auto;
    gap: 20px;
  }
}

</style>
