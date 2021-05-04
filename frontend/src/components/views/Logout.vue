<template>
  <div>
    <index-navbar />
    <section class="header relative pt-16 items-center flex h-screen max-h-860-px"></section>
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