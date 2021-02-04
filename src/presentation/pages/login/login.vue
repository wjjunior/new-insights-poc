<template>
  <div>
    <div class="login">
      <LoginHeader />
      <form class="form" data-test="login-form" @submit.prevent="handleSubmit">
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
import { Authentication, AccessToken } from '@/domain/usecases'
import { ActionTypes } from '@/presentation/store/modules'

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
    },
    authentication: {
      type: Object as () => Authentication
    },
    accessToken: {
      type: Object as () => AccessToken
    }
  },
  methods: {
    async handleSubmit (): Promise<void> {
      if (this.isLoading || this.emailError || this.passwordError) {
        return
      }
      await this.$store.dispatch(ActionTypes.Login, {
        credentials: { email: this.email, password: this.password },
        authentication: this.authentication,
        accessToken: this.accessToken
      })
      this.$router.push('/')
    }
  },
  computed: {
    emailError: function (): string {
      return this.validation.validate('email', this.email)
    },
    passwordError: function (): string {
      return this.validation.validate('password', this.password)
    },
    isLoading (): boolean {
      return this.$store.state.Auth.isLoading
    },
    isAuthenticated (): boolean {
      return this.$store.state.Auth.isAuthenticated
    }
  },
  created (): void {
    this.isAuthenticated && this.$router.push('/')
  }
}
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
