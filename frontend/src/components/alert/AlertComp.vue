<template>
<div v-if="showAlert" class="border rounded py-2 px-3 text-white px-6 py-4 mb-4 bg-red-500">
  <span class="text-xl inline-block mr-5 align-middle">
    <i class="fas fa-bell"></i>
  </span>
  <span class="inline-block align-middle mr-8">
     {{title}}
  </span>
  <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
    <span>×</span>
  </button>
</div>
</template>
<script>
export default {
  name: 'AlertComp',
  props: {
    showAlert: {
      default: false,
      required: true,
    },
    title: {
      default: "",
      required: true,
    },
  },
}
</script>