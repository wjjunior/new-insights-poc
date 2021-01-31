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
          :disabled="!!emailError || !!passwordError"
          type="button"
          class="submit"
          @click="handleSubmit"
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
import { Authentication } from '@/domain/usecases'
import { mapGetters } from 'vuex'

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
    }
  },
  methods: {
    async handleSubmit (): Promise<void> {
      if (this.isLoading || this.emailError || this.passwordError) {
        return
      }
      this.$store.commit('Auth/SET_LOADING', true)
      await this.authentication.auth({ email: this.email, password: this.password })
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
    }
  }
}
</script>

<style lang="scss">
@import "./login-styles.scss";
</style>
