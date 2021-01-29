<template>
  <div>
    <div class="login">
      <LoginHeader />
      <form class="form">
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" :error="emailError" testId="email-status"/>
        <Input type="password" name="password" placeholder="Digite sua senha" :error="passwordError" testId="password-status" />
        <button data-testid="submit" disabled type="button" class="submit" @click="login">Entrar</button>
        <span class="link">Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus
} from '@/presentation/components'

type dataParams = {
  emailError: string,
  passwordError: string
}

export default {
  name: 'Login',
  components: {
    LoginHeader,
    Footer,
    Input,
    FormStatus
  },
  data (): dataParams {
    return {
      emailError: 'Campo obrigatório',
      passwordError: 'Campo obrigatório'
    }
  },
  methods: {
    login (): void {
      this.$store
        .dispatch('LOGIN', { email: 'teste@gmail.com', password: '12345678' })
        .then((res) => console.log('Logged', res))
    }
  }
}
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
