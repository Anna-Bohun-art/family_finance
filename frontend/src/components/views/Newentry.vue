<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>Sign in:</small>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Date
                </label>
                <input
                  type="date"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Date"
                  v-model="date"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Store
                </label>
                <input
                  type="store"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Store"
                  v-model="store"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Value
                </label>
                <input
                  type="value"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Value"
                  v-model="value"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Type
                </label>
                <div class="relative inline-flex align-middle w-full">
                  <a
                    class="text-blueGray-600 font-bold w-full bg-white text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    ref="btnDropdownRef"
                    v-on:click="toggleDropdown($event)"
                  >
                    {{ selected }}
                  </a>
                </div>
                <div 
                  class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                  ref="popoverDropdownRef" 
                  v-bind:class="{
                    hidden: !dropdownPopoverShow,
                    block: dropdownPopoverShow,
                  }">
                  <div
                    v-on:click="getSelectedType($event, 'Food')"
                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                  >
                    Food
                  </div>
                  <div
                    v-on:click="getSelectedType($event, 'Kids')"
                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                  >
                    Kids
                  </div>
                  <div 
                    v-on:click="getSelectedType($event, 'House')"
                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                  >
                    House
                  </div>
                  <div
                    v-on:click="getSelectedType($event, 'Cars')"
                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                  >
                    Cars
                  </div>
                  <div
                    v-on:click="getSelectedType($event, 'Else')"
                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                  >
                    Else
                  </div>
                </div>
              </div>
              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="handleSubmit"
                >
                  Submit
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
import { createPopper } from "@popperjs/core";

export default {
  name: 'NewEntry',
  data() {
    return {
      date: '',
      value: '',
      type: '',
      description: '',
      dropdownPopoverShow: false,
      selected: 'Select'
    };
  },
  methods: {
    getSelectedType(event, selectedType) {
        this.selected = selectedType;
        this.toggleDropdown(event);
    },
    toggleDropdown(e) {
      console.log(e);
      e.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    handleSubmit(e) {
      console.log('handleSubmit');
      e.preventDefault();
      if (this.email.length > 0 && this.password.length > 0) {
        this.$http.post('http://localhost:8081/login', {
          email: this.email,
          password: this.password,
        })
          .then((response) => {
            console.log('Success login');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('jwt', response.data.token);
            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn');
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push('profile');
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
