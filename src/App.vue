<template>

  <html>
  <head>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self';
      script-src 'unsafe-inline'; frame-src *;">
  </head>
  <body>
  <div id="app">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <router-view />
      </div>
      <div class="col-1"></div>
    </div>
  </div>
  </body>
  </html>

<!--  <div id="app">-->
<!--    <div class="row">-->
<!--      <div class="col-1"></div>-->
<!--      <div class="col-10">-->
<!--        <router-view />-->
<!--      </div>-->
<!--      <div class="col-1"></div>-->
<!--    </div>-->

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
<!--  </div>-->
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
