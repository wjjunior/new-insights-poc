<template>
  <div>
    <div class="login">
      <header class="header">
        <logo />
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
import Logo from '@/presentation/components/logo/logo.vue';

export default {
  name: "Login",
  components: {
    Spinner,
    Logo
  },
};
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
