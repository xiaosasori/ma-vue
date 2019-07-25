<template lang="pug">
  div
    section
      label(for="name") Name: 
      input(name="name" type="text" v-model.lazy="$v.name.$model")
      p.error(v-if="!$v.name.required") This field is required
      p.error(v-if="!$v.name.minLength") Field must have at least {{ $v.name.$params.minLength.min }} characters
    section
      label(for="email") Email: 
      input(name="email" type="email" v-model="$v.email.$model")
      p.error(v-if="!$v.email.required") This field is required
      p.error(v-if="!$v.email.email" id="error-email") Must be email
    section
      label(for="password") Password: 
      input(name="password" type="password" v-model="$v.password.$model")
      p.error(v-if="!$v.password.required") this field is required
      p.error(v-if="!$v.password.strongPassword")
      |  Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.
    section
      label(for="confirmPassword") Please re-type your Password
      input(name="confirmPassword" v-model="$v.confirmPassword.$model" type="password")
      p.error(v-if="!$v.confirmPassword.required") this field is required
      p.error(v-if="!$v.confirmPassword.sameAsPassword") The passwords do not match.
    section
      button.submit(@click.prevent="submitForm") Submit
</template>

<script>
import {required, minLength, sameAs, email} from 'vuelidate/lib/validators'
export default {
  data: () => ({
    name: null,
    email: null,
    password:null,
    confirmPassword: null
  }),
  validations: {
    name: {
      required,
      minLength: minLength(2)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      strongPassword(password) {
        return /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g.test(password) // checks for a-z
      }
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    submitForm() {
      if(!this.$v.$anyDirty) console.log('form is empty')
      else if(this.$v.anyError) console.log('error')
      else console.log('success')
    }
  }
}
</script>

<style scoped>
  .error {
    color: red
  }
</style>
