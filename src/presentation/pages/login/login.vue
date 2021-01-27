<template>
  <div>
    <div class="login">
      <header class="header">
        <img
          src="data:image/svg+xml;base64,IDxzdmcgaWQ9ImxvZ28iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMDY3IiBoZWlnaHQ9IjEwMDAiIHZlcnNpb249IjEiCiAgICB2aWV3Qm94PSIwIDAgMzA2NyAxMDAwIiBzdHlsZT0id2lkdGg6IDkwJTsgbWF4LXdpZHRoOiA0MDBweDsgaGVpZ2h0OiBhdXRvOyI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTAgMGgzMDY3djEwMDBIMHoiIC8+CiAgICA8L2RlZnM+CiAgICA8Y2xpcFBhdGggaWQ9ImIiPgogICAgICAgIDx1c2Ugb3ZlcmZsb3c9InZpc2libGUiIHhsaW5rOmhyZWY9IiNhIiAvPgogICAgPC9jbGlwUGF0aD4KICAgIDxwYXRoIGZpbGw9IiNGREJGMkYiIGQ9Ik0zMzYgMTAwMGgzNDFWNzI3aDM4OVYyaC0xVjBINTk4djY0OEg0MTVWMjU1SDB2NDcyaDMzNnYyNzNNNjc3IDc5aDMxMHY1NjlINjc3Vjc5ek03OSAzMzNoMjU3djMxNUg3OVYzMzN6bTUxOSA1ODhINDE1VjcyN2gxODN2MTk0eiIKICAgICAgICBjbGlwLXBhdGg9InVybCgjYikiIC8+CiAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTE2MiA0NDFoNzJ2Mjg0aC03MnptMTM4IDI3N1Y0NDFoNzJsMTMzIDE2OVY0NDFoNzJ2Mjc3aC03MmwtMTMzLTE3MHYxNzB6bTQ5NS0yMDZjLTgtNy0xNi0xMS0yNC0xNS03LTMtMTUtNC0yMi00LTEwIDAtMTcgMi0yMyA2LTYgNS05IDExLTkgMTggMCA1IDEgOSA0IDEyczcgNiAxMiA4YTQ0MyA0NDMgMCAwIDEgMzQgMTJjMjQgOCA0MSAxOCA1MiAzMXMxNiAzMSAxNiA1MmMwIDE0LTIgMjctNyAzOC01IDEyLTEyIDIyLTIxIDMwcy0yMSAxNC0zNCAxOS0yOCA3LTQ1IDdjLTM1IDAtNjgtMTEtOTgtMzFsMzEtNTljMTEgMTAgMjIgMTcgMzIgMjIgMTEgNCAyMSA3IDMxIDcgMTIgMCAyMS0zIDI3LTggNS02IDgtMTIgOC0xOSAwLTQgMC04LTItMTEtMS0zLTQtNi03LThsLTE0LTdhNDQ3IDQ0NyAwIDAgMC00Ny0xN2MtOS00LTE3LTktMjQtMTUtNy01LTEzLTEzLTE3LTIycy02LTIwLTYtMzQgMi0yNiA2LTM3YTgzIDgzIDAgMCAxIDUwLTQ4YzEyLTQgMjUtNiA0MC02YTE3NSAxNzUgMCAwIDEgODYgMjJsLTI5IDU3em05My03MWg3MnYyNzdoLTcyem0yNzIgMTIyaDE0NGwtMiA0MGExNDIgMTQyIDAgMCAxLTI5IDcyYy04IDExLTE5IDIwLTMxIDI4YTE2OCAxNjggMCAwIDEtMTQzIDEyIDEzMyAxMzMgMCAwIDEtNzUtNzZjLTgtMTgtMTEtMzgtMTEtNjBzMy00MSAxMC01OWExMzAgMTMwIDAgMCAxIDc3LTc2YzE4LTggMzgtMTEgNjAtMTEgMjkgMCA1NSA2IDc3IDE5IDIxIDEyIDM5IDMyIDUyIDU4bC02OSAyOGMtNi0xNS0xNS0yNi0yNS0zM2E3MCA3MCAwIDAgMC02NC00IDY5IDY5IDAgMCAwLTM3IDQ1IDExMiAxMTIgMCAwIDAtMSA2OGMzIDEwIDggMTkgMTQgMjZzMTMgMTMgMjMgMTdhODggODggMCAwIDAgNTIgNGM2LTIgMTItNCAxOC04IDUtMyA5LTggMTMtMTQgMy01IDUtMTIgNy0yMGgtNjB2LTU2em0yNjktMTVoMTA0VjQ0MWg3MnYyNzdoLTcyVjYwNGgtMTA0djExNGgtNzJWNDQxaDcyem0zNDctNDZ2MjE2aC03MlY1MDJoLTYwdi02MWgxOTF2NjF6bTI1MSAxMGMtOC03LTE2LTExLTIzLTE1LTgtMy0xNi00LTIzLTQtMTAgMC0xNyAyLTIzIDYtNiA1LTkgMTEtOSAxOCAwIDUgMiA5IDUgMTIgMiAzIDYgNiAxMSA4YTQ0MSA0NDEgMCAwIDEgMzQgMTJjMjQgOCA0MSAxOCA1MiAzMXMxNiAzMSAxNiA1MmMwIDE0LTIgMjctNyAzOC01IDEyLTEyIDIyLTIxIDMwcy0yMCAxNC0zNCAxOWExNjcgMTY3IDAgMCAxLTE0My0yNGwzMS01OWMxMSAxMCAyMiAxNyAzMiAyMiAxMSA0IDIxIDcgMzEgNyAxMiAwIDIxLTMgMjctOCA2LTYgOC0xMiA4LTE5IDAtNCAwLTgtMi0xMWwtNy04LTE0LTdhNDQ4IDQ0OCAwIDAgMC00Ny0xN2MtOS00LTE3LTktMjQtMTUtNy01LTEzLTEzLTE3LTIycy02LTIwLTYtMzQgMi0yNiA2LTM3YTgzIDgzIDAgMCAxIDUwLTQ4YzEyLTQgMjUtNiA0MC02YTE3NSAxNzUgMCAwIDEgODYgMjJsLTI5IDU3eiIKICAgICAgICBjbGlwLXBhdGg9InVybCgjYikiIC8+Cjwvc3ZnPg=="
        >
      </header>
      <form class="form">
        <h2>Login</h2>
        <div class="inputWrap">
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          >
          <span class="status">🔴</span>
        </div>
        <div class="inputWrap">
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          >
          <span class="status">🔴</span>
        </div>
        <button
          type="submit"
          class="submit"
        >
          Entrar
        </button>
        <span class="link">Criar conta</span>
        <div class="errorWrap">
          <spinner />
          <span class="error">Erro</span>
        </div>
      </form>
      <footer class="footer" />
    </div>
  </div>
</template>

<script>
import Spinner from '@/presentation/components/spinner/spinner.vue';

export default {
  name: "Login",
  components: {
    Spinner
  },
};
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
