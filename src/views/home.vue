<template>
	<div class="loading">
		<img src="http://s3.pstatp.com/resource/neihan_wap/static/image/guidence/title_cbd60e1.png" alt="">
	</div>
</template>

<script>
    require('../assets/scss/index.scss');
    export default {
        name: 'home',
        mounted() {
            setTimeout(() => {
                this.$router.push({
                    name: 'list'
                });
            }, 2000);
        }
    }
</script>

<style lang="scss">

    @keyframes index {
        0 {
            width: 100%;
            opacity: 1;
            transform: rotate(0);
        }
        100% {
            width: 0;
            opacity: 0;
            transform: rotate(720deg);
        }
    }

    .loading {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100%;
            animation: index 2s ease-out 1s;
        }
    }
</style>