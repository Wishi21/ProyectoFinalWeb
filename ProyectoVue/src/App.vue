<template >
  <div id="app" >
    <b-nav tabs align="center" class="mb-3">
        <b-nav-item tag="h1"  to="/">
          Inicio
        </b-nav-item>
        <b-nav-item tag="h1"  to="/categorias">
          Categorias
        </b-nav-item>
         <b-nav-item tag="h1"  to="/personal">
          Personal
        </b-nav-item>
        <b-nav-item tag="h1"  to="/tickets">
          Tickets
        </b-nav-item>
    </b-nav>
    <notifications position="top right" />
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
