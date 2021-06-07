<template >
  <div id="app" >
    <b-nav varient="dark" tabs align="center" class="mb-3 navbar bg-dark" >
        <b-nav-item class="item" tag="h1"  to="/">
          Inicio
        </b-nav-item>
        <b-nav-item class="item" tag="h1"  to="/categorias">
          Categorias
        </b-nav-item>
         <b-nav-item class="item" tag="h1"  to="/personal">
          Personal
        </b-nav-item>
        <b-nav-item toggle-class="itemhover" class="item" tag="h1"  to="/tickets">
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
  color: #000000;
}

.item a{
  color: white;
}

.itemhover {
  color: black;
}

</style>
