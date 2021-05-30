<template>
  <div>
    <side-bar-menu />
    <div class="relative md:ml-64 bg-blueGray-100">
      <div class="px-4 md:px-10 pt-8 mx-auto w-full">
        <router-view />
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
import SideBarMenu from "@/components/bars/SideBarMenu";
import Footer from "@/components/footers/Footer";
import registerBg from "@/assets/image/register_bg.png";

export default {
  data() {
    return {
      registerBg,
    };
  },
  components: {
    SideBarMenu,
    Footer,
  },
};
</script>
