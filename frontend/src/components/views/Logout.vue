<template>
  <div>
    <index-navbar />
    <section class="header relative pt-16 items-center flex h-screen max-h-860-px"></section>
    <button class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
      type="button" @click="handleLogout">Logout
    </button>
  </div>
</template>
<script>

export default {
  data() {
  },
  components: {
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      this.$router.push('login');
    }
  },
}
</script>