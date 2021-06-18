<template>
  <div class="container mx-auto px-4 h-full">
    <!--<AlertComp :title="errorText" :showAlert="showAlert"/>-->
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-4 font-bold">
              <h3>New Entry</h3>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  v-model="date"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Date"
                  required
                />
              </div>
              <div class="relative w-full mb-1">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Store
                </label>
                <input
                  type="store"
                  v-model="store"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Store"
                  required
                />
              </div>
              <div class="pb-0 relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Type
                </label>
                <Multiselect
                class= "placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-multiselect shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="type"
                  placeholder="Select one"
                  :options="options"
                  trackBy="name"
                  label="name"
                  :searchable="true"
                  required
                />
              </div>
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Value
                </label>
                <input
                  type="value"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Value"
                  v-model="value"
                  required
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
import Multiselect from "@vueform/multiselect";
import axios from "axios";

export default {
  name: "NewEntry",
  /*props: [allData],*/
  components: { Multiselect },
  data() {
    return {
      options: ["food", "kids", "house", "cars", "else"],
      date: "",
      store: "",
      type: null,
      value: "",
      allData: [],
      errorText:''
    };
  },
  methods: {
    clearForm() {
      this.date = "";
      this.store = "";
      this.type = "";
      this.value = "";
    },
    isValidInput() {
      return (
        this.date !== null &&
        this.date.length > 0 &&
        this.store !== null &&
        this.store.length > 0 &&
        this.type !== null &&
        this.type.length > 0 &&
        this.value !== null &&
        this.value.length > 0
      );
    },
    async handleSubmit(e) {
      e.preventDefault();
      if (this.isValidInput()) {
        this.showAlert = false;
        this.allData.push([this.date, this.store, this.type, this.value]);
        console.log(this.allData);
        axios
          .post("http://localhost:8081/api/entry", {
            date: this.date,
            store: this.store,
            type: this.type,
            value: this.value,
          })
          .then((response) => {
            console.log("Success imput!");
            console.log(response.data);
            this.clearForm();
          })
          .catch((error) => {
            console.log("ERROR imput!");
            console.log(error);
          });
      } else {
        this.showAlert = true;
        this.errorText = 'Your input is not complete';
        console.log('Your input is not complete');
      }
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
