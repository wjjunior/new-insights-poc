<template>
  <div>
    <div class="login">
      <LoginHeader />
      <form class="form" @submit="handleSubmit">
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
          :disabled="!!emailError || !!passwordError"
          type="submit"
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
import store from '@/presentation/store'

type dataParams = {
  email: string;
  password: string;
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
      password: ''
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
    },
    handleSubmit (event: KeyboardEvent): void {
      event.preventDefault()
      store.commit('SET_LOADING', true)
    }
  },
  computed: {
    emailError: function (): string {
      return this.validation.validate('email', this.email)
    },
    passwordError: function (): string {
      return this.validation.validate('password', this.password)
    }
  }
}
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
