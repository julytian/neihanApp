<template>
  <div>

    <div class="page-cover" v-if="show&&fixHead" @click="showMenus">

    </div>

    <header :class="{'show':show&&fixHead,'fix-header':fixHead,'no-fix':!fixHead}" id="hd">

      <div class="nv-toolbar">

        <div class="toolbar-nav" @click="openMenu" v-if="fixHead">

        </div>

        <span v-text="pageType"></span>

      </div>

    </header>

    <nh-menu :show-menu="show" :page-type="pageType" v-if="fixHead"></nh-menu>

  </div>
</template>

<script>
  import $ from 'webpack-zepto';
  export default {
    replace: true,
    props: {
      pageType: String,
      fixHead: Boolean
    },
    data() {
      return {
        show: false
      };
    },
    methods: {
      openMenu() {
        // $('html, body, #page').addClass('scroll-hide');
        this.show = !this.show;
      },
      showMenus() {
        this.show = !this.show;
        // $('html, body, #page').removeClass('scroll-hide');
      }
    },
    components: {
      'nhMenu': require('./menu.vue')
    }
  };

</script>
<style lang="scss">
 
</style>
