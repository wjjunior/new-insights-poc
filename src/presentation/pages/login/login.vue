<template>
  <div>
    <div class="login">
      <LoginHeader />
      <form class="form">
        <h2>Login</h2>
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <button
          type="submit"
          class="submit"
        >
          Entrar
        </button>
        <span class="link">Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  </div>
</template>

<script>
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components'

export default {
  name: "Login",
  components: {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
  },
};
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
