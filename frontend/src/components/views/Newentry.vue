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
                <select 
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="selected"
                >
                  <option
                    v-for="product of products"
                    v-bind:value="product.id"
                    v-bind:key="product.name"
                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                  >
                  {{product.name}}
                  </option>
                  <!--
                  <option
                    v-on:click="getSelectedType($event, 'Kids')"
                    class="text-blueGray-600 font-bold w-full bg-white text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Kids
                  </option>
                  <option
                    v-on:click="getSelectedType($event, 'House')"
                    class="text-blueGray-600 font-bold w-full bg-white text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    House
                  </option>
                  <option
                    v-on:click="getSelectedType($event, 'Cars')"
                    class="text-blueGray-600 font-bold w-full bg-white text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Cars
                  </option>
                  <option
                    v-on:click="getSelectedType($event, 'Else')"
                    class="text-blueGray-600 font-bold w-full bg-white text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Else
                  </option>
                  -->
                </select>
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
                <h1>{{selected.text}}</h1>
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
  data: () => ({ 
    date: "", 
    store: "", 
    value:"", 
    allData: [] ,
    dropdownPopoverShow: false,
    selected: 'Select',
    products: [
      {id: 1, name: 'kids'},
      {id: 2, name: 'house'},
      {id: 3, name: 'cars'},
      {id: 4, name: 'else'}
    ]
  }),
  methods: {
    getSelectedType(event, selectedType) {
        console.log(selectedType);
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
      e.preventDefault();
      if (this.date !== null && this.store !== null && this.type !== null && this.value !== null) {
        this.allData.push({ date: this.date, store: this.store, selectedType: this.selectedType, value: this.value });
        //this.clearForm();
        console.log(this.date);
        console.log(this.selected);
      } else {
        console.log("error");
      }
    },
    clearForm() {
      this.date = "";
      this.store = "";
      this.selectedType = "";
      this.value = "";
    },
  },
};
</script>
