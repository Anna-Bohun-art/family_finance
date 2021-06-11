<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        > 
          <!--<hr class="mt-6 border-b-1 border-blueGray-300" />-->
          <div class="flex-auto px-4 lg:px-10 py-10 pt-5">
            <form @submit.prevent="handleRegister">
              <div class="relative w-full mb-3"
              :class="{ 'hasError': v.form.username.$error }"
              >
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name"
                  v-model.trim="form.username"
                />
                <error v-if="v.form.username.$error"
                  class="hasError"
                >
                  Name field has an error.
                </error>
              </div>
              <div class="relative w-full mb-3"
              :class="{ 'hasError': v.form.email.$error || !v.form.email.email}"
              >
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model.trim="form.email"
                  required
                  :class="{'hasError': v.form.email.$error || !v.form.email.email}" 
                />
                <error v-if="v.form.email.$error || !v.form.email.email"
                >
                  Error! Email is not validated.
                </error>
              </div>
              <div class="relative w-full mb-3"
              :class="{ 'hasError': v.form.password.$error }"
              >
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  ref="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model.trim="form.password"
                />
                <error v-if="v.form.password.$error"
                >
                  Password should have at least 6 symbols.
                </error>
              </div>
              <div class="relative w-full mb-3"
              :class="{ 'hasError': v.form.repeatPassword.$error || !v.form.repeatPassword.sameAsPassword }">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  ref="password"
                  name="repeatPassword"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Repeat password"
                  v-model="form.repeatPassword"
                  required
                />
                <!--<error v-if="v.form.repeatPassword && !v.form.repeatPassword.sameAsPassword"
                  class="text-red-500 text-left"
                >-->
                <error v-if="v.form.repeatPassword.$error"
                >
                  Passwords should have minimum 6 characters.
                </error>
                <error v-if="!v.form.repeatPassword.sameAsPassword"
                >
                  Passwords should be identical.
                </error>
                <!--</error>-->
              </div>
              <br>
              <div class="relative w-full mb-3"
                :class="{ 'hasError': v.form.checkBox.$error }">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    v-model="form.checkBox"
                    type="checkbox"
                    class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    required
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    I agree with the
                    <a href="javascript:void(0)" class="text-emerald-500">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                <br>
                <error
                  v-if="v.form.checkBox.$error"
                >
                  You should agree with the Privacy Policy
                </error>
              </div>
              <div class="text-center mt-6" >
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button" @click="handleRegister"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { email, required, sameAs, minLength } from '@vuelidate/validators'

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        checkBox: "",
      },
      v: useVuelidate(),
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(4)
      },
      email: {
        email, 
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs('password')
      },
      checkBox: { required },
      },
  },
  methods: {
    async handleRegister() {
      console.log('handleRegister');
      this.v.form.$touch();
      if(this.v.form.$error) {
        this.v.$errors.forEach(error => {
          console.log(`Property: ${error.$property} - ${error.$message}`);
        });
        return;
      }
      /*if (this.form.email < 6 || this.form.password < 6) {
        return;
      }*/ else {
        const log = `email: ${this.form.email} - password: ${this.form.password}`;
        console.log(log);
        this.$http.post('http://localhost:8081/register', {
          email: this.form.email,
          password: this.form.password,
        }).then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('jwt', response.data.token);
          if (localStorage.getItem('jwt') != null) {
            this.$emit('loggedIn');
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push('dashboard');
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  }
}
</script>
