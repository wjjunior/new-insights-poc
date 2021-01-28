<template>
  <div>
    <div class="login">
      <LoginHeader />
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
          <Spinner />
          <span class="error">Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  </div>
</template>

<script>
import Spinner from '@/presentation/components/spinner/spinner.vue';
import LoginHeader from '@/presentation/components/login-header/login-header.vue';
import Footer from '@/presentation/components/footer/footer.vue';

export default {
  name: "Login",
  components: {
    Spinner,
    LoginHeader,
    Footer
  },
};
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
