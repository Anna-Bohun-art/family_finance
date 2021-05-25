<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>New Entry</small>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  v-model="date"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Date"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                >
                  Store
                </label>
                <input
                  type="store"
                  v-model="store"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Store"   
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                >
                  Type
                </label>
                <Multiselect 
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="type" 
                  placeholder="Select one" 
                  :options="options"
                  trackBy="name" 
                  label="name"
                  :searchable="true"
                >
                <template v-slot:singleLabel="{ type }">
                  <div class="multiselect-single-label">
                    <img height="26" style="margin: 0 6px 0 0;" :src="value.icon"> {{ type.name }}
                  </div>
                </template>
                <template v-slot:option="{ option }">
                  <img height="22" style="margin: 0 6px 0 0;">{{ option.name }}
                </template>
                  <!--<template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.id }}</strong> is written in<strong>  {{ option.name }}</strong></template>-->
                  
                </Multiselect>
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
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
import Multiselect from '@vueform/multiselect'

export default {
  name: 'NewEntry',
  components: { Multiselect },
  data() { 
    return {
      options: [
        'kids','house','cars','else'
      ],
      date: "", 
      store: "",
      type: null, 
      value: "", 
      allData: [],
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      if (this.date !== null && this.store !== null && this.type !== null && this.value !== null) {
        this.allData.push( [this.date, this.store, this.type, this.value] );
        console.log(this.allData);
        this.$http.post('http://localhost:8081/report', {
          date: this.date,
          store: this.store,
          type: this.type,
          value: this.value,
        })
          .then((response) => {
            console.log('Success imput!');
            console.log(response.data);
            this.clearForm();
          })
          .catch((error) => {
            console.log(error);
          });
        }
      },
    },
    clearForm() {
      this.date = "";
      this.store = "";
      this.type = "";
      this.value = "";
    },
  }
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
