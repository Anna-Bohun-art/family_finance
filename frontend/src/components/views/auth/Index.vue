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
// import IndexNavbar from '@/components/Navbars/IndexNavbar';
// import FooterComponent from '@/components/Footers/Footer';

// import patternVue from "@/assets/imgage/pattern_vue.png";
// import componentBtn from "@/assets/imgage/component-btn.png";
// import componentProfileCard from "@/assets/img/component-profile-card.png";
// import componentInfoCard from "@/assets/img/component-info-card.png";
// import componentInfo2 from "@/assets/img/component-info.png";
// import componentMenu from "@/assets/img/component-menu.png";
// import componentBtnPink from "@../../../assets/image/component-btn-pink.png";
// import documentation from "@/assets/img/documentation.png";
// import login from "@/assets/image/login.jpg";
// import profile from "@/assets/image/profile.jpg";
// import landing from "@/assets/image/landing.jpg";

export default {
  data() {
  },
  components: {
    // IndexNavbar,
    // FooterComponent,
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