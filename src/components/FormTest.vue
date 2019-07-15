<template>
  <section class="container">
    <form @submit.prevent="submit">
      <b-field label="Email">
        <b-input @blur="$v.form.email.$touch()" type="email" maxlength="30" v-model="form.email"></b-input>
        <template v-if="$v.form.email.$error">
          <span v-if="!$v.form.email.required" class="help is-danger">This field is required</span>
          <span
            v-else-if="!$v.form.email.email"
            class="help is-danger"
          >This in not a valid email address</span>
        </template>
      </b-field>

      <b-field label="Username" type="" message="">
        <b-input v-model="form.name" maxlength="30"></b-input>
        <template v-if="$v.form.name.$error">
          <span v-if="!$v.form.name.required" class="help is-danger">This field is required</span>
        </template>
      </b-field>

      <b-field label="Password">
        <div class="control">
          <b-input autocomplete="off" type="password"></b-input>
        </div>
      </b-field>
        <div class="field">
          <b-checkbox type="checkbox" v-model="form.check">Agree</b-checkbox>
        </div>
      <b-field label="Message">
        <b-input maxlength="200" type="textarea"></b-input>
      </b-field>
      <b-button native-type="submit" type="is-success">Submit</b-button>
    </form>
  </section>
</template>

<script>
import {
  required, requiredIf,
  email,
  minLength,
  integer,
  between
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        email: "",
        check: null
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      name: {
        required: requiredIf(function() {return !!this.form.check})
      }
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$snackbar.open({
          duration: 1000,
          message: "Submited",
          type: "is-success",
          position: "is-bottom",
          queue: false
        });
      }
    }
  }
};
</script>