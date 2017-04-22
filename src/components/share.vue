<template>
  <div class="share-wrap" @click="shareClose">
    <div class="share-cover" v-show="shareShow"></div>
    <div class="share-con" :class="{shareShow:shareShow}">
      <div class="share-tt">分享到</div>
      <ul>
        <li>
          <a class="share-icon icon-sina" :href="sinaUrl" target="_blank">
            <span>新浪微博</span>
          </a>
        </li>
        <li>
          <a class="share-icon icon-qzone" :href="qzoneUrl" target="_blank">
            <span>QQ空间</span>
          </a>
        </li>
      </ul>
      <div class="share-cancel">
        <span>取消</span>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'webpack-zepto';

  export default {
    props: ['shareTitle', 'sharePic', 'shareUrl', 'shareOpen'],
    data() {
      return {
        sinaUrl: "http://service.weibo.com/share/share.php?url=" + this.shareUrl + "&title=" + this.shareTitle +
          "&pic=" + this.sharePic + "&appkey=",
        qzoneUrl: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + this.shareUrl + "&title=" + this.shareTitle +
          "&desc=" + this.shareTitle + "&summary=''&site=" + this.shareUrl,
        shareShow: this.shareOpen
      }
    },
    methods: {
      shareClose() {
        this.shareShow = false;
        this.$emit('shareClose');
      }
    }
  }

</script>
<style lang="scss">
  .share-wrap,
  .share-cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .share-cover {
    z-index: 1001;
    background-color: rgba(0, 0, 0, .5);
  }

  .share-con {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    z-index: 1002;
    transform: translateY(100%);
    transition: .5s;

    .share-tt {
      color: #666;
      font-size: 16px;
      display: block;
      text-align: center;
      margin: 10px auto;
      line-height: 20px;
    }
    ul {
      display: flex;
      margin-bottom: 15px;
    }
    ul>li {
      flex: 1;
    }
    ul>li a span {
      text-align: center;
      display: block;
      font-size: 12px;
      transform: translateY(55px);
      color: #4f5157;
    }
    .share-icon {
      display: block;
      height: 50px;
      width: 50px;
      margin: 0 auto 10px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      position: relative;
    }
    .icon-sina {
      background-image: url(data:image/png;base64,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)
    }
    .icon-qzone {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAABxCAMAAADVoLziAAAAflBMVEUAAAD/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/////yVX/1Hj/9d//+Of/89j/68H/57P/+/H/46b/zGH/3JD/2IX//fj/z2r/783/35v9yVS4AAAAGHRSTlMAHeMI7KMSc0L1gbmulzAoi8xbT9lmNcIlFBFpAAAEiElEQVRo3rTW666qQAwFYEBQQVBR3K6CwHCH93/Bs0PMcSsX6QDfb5KmM6tTFKbtz3V3NuzDL9twrNv+pKxnu7cOGjpM17mtUfZo3TFCMy4bZUEny8NXpn1dqOjmcsdE+lldoN5OA4f9M7eeDi77qMi7aJBhqLLxdCHJ3Ekd6BkzuEf+QLiYh9vmzcRchy3nRB0sQJs+KFsXizAvU6/QA8f8yzzqWM5Z+e5Hx5Icbofrd3nSsTRrPKUelncbm0MXa9grgxysQlcHlxNW4m4GUmOCZX5gXXCIqEJL/iotcARENabTNj1nCpaQiAK0ZN+eOzhS+hWBobO6ruDIqMVp8v45+x44amo9wPCxLG/gKOipwHTee4saOEJ6CsFwkW9R0H85WvwmPTBU9JKA4Sob1Ij+aNDixtUGQ0F/JT6mOylPKhj8hN6kaPEe9B0YBL0rGU1qMkujok8C0+0lDjWijgyTOfxhzKkrBpjHegA4semqALDSamIyQV2s1bxrf/sxIzbcrWXwZsN/UL/IZ12kga+yIE/jqKQRyaOORZMH1Zfi6vg0+lXRiDoknjKMYpHmRZANTKTZV6ptKqF5iv7oqBMzyVcMvAF79ElpRJmEYRTVcSxEmjZ5XgRBFYSTCuIw+OLk1PWI8yrz/UkxLgP08oaHI+iPZhinRSZfELqinDGgGg5OGYkm8NkFW4riMAf+JalFnvV+mFQYtB17APyIvoh8bkGo409OTKNEb4dhhtGKNndZvDTsgt0eu/71amdLqsJAGIAbhAiIuI42wcgq4vu/4KnDXFAplu4IzHc9VV2Of2K6k8/415gMF5Q4ryK+RjZwNRyah8Rpgp5vJIOrpJFaQf7v1obRjJdqJDPfFPS1PYe/SqqRgkiymT1H08vMUMEGaSeAm/EB51GObEkJ76AjTLubZnQP/DBbDwdpRb+zkVWaf3FUPusHZHq3q1/awim0TCmkRQBwNGj81buX41fWLR6JpA2zQZ5ebmWV1szo3Jmt1Xvwe5Jl+U6S16uqPkXR5qhgjrCvzKiqosiyNG2eT6Xy+rsGxGNOjouYJ0eCv2FOOtKYqcRpO2htfCQ82Idi5q2SS0aVK8NpFnOAVMZcT+4Iyaai2qeSsol7au4sMDCNat5u2snDbCTgdMNyyzCqmcRfVR7rKu4dhGsS1bTETlHzo2NBJ8IptRaOBDVS+w88iKlDJ2RGNa+w5/2MO8Qsh/chky6KxUiYFePk4YLOZRzLUzn+NzV18vAt0Fk+FdVmMvkyi1sp/6p1Oz1uVAkSfncERV9c0XcsdbviGdodQVJT+c4Nh8luxZOqXEkyNp0AV2MLGHTHtXgwzHJwHVsY4+EqQhj3gys4CZhwxMXZFkxycWHOAQjhwgUjILkrFlz/dYdNFFx887lawHT2kbbsi7nIxvkCMCHC2Zm5wN++Q9xZYMzazfiA50UfzNL2Ar60CRw0t4tgBnH00czdg5mE0WPr8AZLuITIYgcWLEX87MhyxxssS1z2VxzhhNsDrEJ42/3d1mqdwuB8gLWJw837L7I2YO4fhBSrfCUWk8MAAAAASUVORK5CYII=)
    }

    .share-cancel {
      border-top: 1px solid #C7C7C7;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
    }
  }

  .shareShow {
    transform: translateY(0);
  }

</style>
