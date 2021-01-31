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
          :error="emailError"
          testId="email-status"
          v-model:value="email"
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          :error="passwordError"
          testId="password-status"
          v-model:value="password"
        />
        <button
          data-test="submit"
          disabled
          type="button"
          class="submit"
          @click="login"
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

<script lang="ts">
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'

type dataParams = {
  email: string,
  password: string,
  passwordError: string;
};

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
      email: '',
      password: '',
      passwordError: 'Campo obrigatório'
    }
  },
  props: {
    validation: {
      type: Object as () => Validation
    }
  },
  methods: {
    login (): void {
      this.$store
        .dispatch('LOGIN', { email: 'teste@gmail.com', password: '12345678' })
        .then((res) => console.log('Logged', res))
    }
  },
  computed: {
    emailError: function (): string {
      return this.validation.validate('email', this.email)
    }
  },
  watch: {
    password: function (password: string): void {
      this.validation.validate('password', password)
    }
  }
}
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
