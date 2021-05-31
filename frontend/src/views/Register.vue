<template>
  <div class="container mx-auto px-4 h-full">
    <AlertComp :title="errorText" :showAlert='showAlert'></AlertComp>
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        > 
          <!--<hr class="mt-6 border-b-1 border-blueGray-300" />-->
          <div class="flex-auto px-4 lg:px-10 py-10 pt-5">
            <form>
              <div class="relative w-full mb-3 ">
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
                  v-model="username"
                  required
                />
              </div>

              <div class="relative w-full mb-3">
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
                  v-model="email"
                  required
                />
                <span v-if="emailLengthValidation" class="inline-block align-middle mr-8 text-red-500">
                  This email is not valid. Please use at least 6 digit email!
                </span>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model="password"
                  required
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  name="repeatpassword"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Repeat password" v-model="repeatPassword"
                  required
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    v-model="checkbox"
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
              </div>

              <div class="text-center mt-6">
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
import AlertComp from "@/components/alert/AlertComp.vue"

export default {
  name: "App",
  components: { AlertComp },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorText: "",
      showAlert: false,
      checkbox: "",
    };
  },
  computed:{
    emailLengthValidation: function(){
      if(this.email.length < 6) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async handleRegister(e) {
      console.log('handleRegister');
      e.preventDefault();
      if (this.email.length < 6 || this.password.length < 6) {
        this.errorText = 'This email or password is not valid. Please use 6 digit password';
        this.showAlert = true;
        console.log('This email or password is not valid. Please use 6 digit password')
        //alert('This email or password is not valid. Please use 6 digit password');
        return;
      } 
      else if (this.password !== this.repeatPassword) {
        this.errorText = 'Your password is not valid. Please, try again';
        this.showAlert = true;
        alert('Your password is not valid. Please, try again');
        return;
      }
      else if(this.checkbox === ""){
        this.errorText = 'You should agree with the Private Policy of the website';
        this.showAlert = true;
        alert('You should agree with the Private Policy of the website');
        return;
      } else {
        const log = `email: ${this.email} - password: ${this.password}`;
        console.log(log);
        this.$http.post('http://localhost:8081/register', {
          email: this.email,
          password: this.password,
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
    },
  }
</script>
