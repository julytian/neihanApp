<template>
  <section id="sideBar" class="nav-list" :class="{'show':showMenu}">
    <div class="logo-info">
      <img class="logo" src="http://s3.pstatp.com/resource/neihan_wap/static/image/joke_jokeessay_new_c0cceed.png" alt="">
      <div class="desc">
        <h2>内涵段子</h2>
        <p>搞笑段子、图片 <br>  视频火爆聚集地</p>
      </div>
    </div>
    <section class="list-ul">
      <router-link class="iconfont icon-tuijian  item" :to="{'name':'list',query:{list_id:'-101'}}">推荐</router-link>
      <router-link class="iconfont icon-shipin  item" :to="{'name':'list',query:{list_id:'-104'}}">视频</router-link>
      <router-link class="iconfont icon-xiu  item" :to="{'name':'list',query:{list_id:'-301'}}">段友秀</router-link>
      <router-link class="iconfont icon-tupian  item" :to="{'name':'list',query:{list_id:'-103'}}">图片</router-link>
      <router-link class="iconfont icon-jingcaiduanzi2  item" :to="{'name':'list',query:{list_id:'-102'}}">段子</router-link>
    </section>
  </section>
</template>
<script>
    export default {
        replace: true,
        props: ['showMenu', 'pageType']
    };
</script>

<style lang="scss">
    /*侧边栏*/

    .nav-list {
        position: fixed;
        top: 0;
        bottom: 0;
        left: -200px;
        width: 200px;
        background-color: #fff;
        color: #313131;
        transition: all .3s ease;
        z-index: 99;
        &.show {
            transform: translateX(200px);
        }
    }

    .logo-info {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px dashed #ff819f;
    }

    .logo {
        width: 50px;
        border-radius: 50%;
        margin: 15px 15px 0 15px;
    }

    .desc {
        flex: 1;
        margin-top: 15px;
        margin-right: 15px;
        h2 {
            font-size: 18px;
            margin-bottom: 5px;
        }
        p {
            font-size: 12px;
            line-height: 1.5;
        }
    }
    /*侧边栏列表*/

    .list-ul {
        margin: 0 24px;
        overflow: hidden;
        padding-top: 9%;
        .item {
            display: block;
            font-size: 20px;
            padding: 9% 0;
            text-align: left;
            text-indent: 1px;
            line-height: 20px;
            color: #ff819f;
            font-weight: 500;
            text-decoration: none;
        }
    }

    .iconfont {
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-tupian:before,
    .icon-xiu:before,
    .icon-shipin:before,
    .icon-jingcaiduanzi2:before,
    .icon-tuijian:before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 20px;
        vertical-align: top;
    }

    .icon-tupian:before {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABEVBMVEUAAAD/gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ8AAAD6OxFgAAAAWXRSTlMAMd7CHRVaZbxgU4wyCrAzBerCQmYQWguWKBGdvgdX+UoAK6FmH2YfZh9mH2YfZh8ZrWYfGQOtAB8ZA60fGQOtHxkDrR8ZBK0fGQStHxkKnE4JxRGGxsVyBkXWNyMAAAABYktHRACIBR1IAAAAB3RJTUUH4QQVASYH3/MfWgAAARVJREFUWMPt09tXAVEUBvCtiEiKhO6lQpRcu6goFd0V4vz//4jGOJkzD2b2PisPrfO97W995/dgDQCV/xXHDMNl1im8dyGfaxGAOVnArYApAZ55r08GWNCG/kUyENCXS8tEIMinISKwwqdhIrDKpxEiEOXTGPVHXBtN16nAxuZwucWoANve2YW9OKMD5kwC9g/kgEOAhAyQ1JoUHTjSqzQVyPDumAacjMus+OA0ZwfIG9uCcV+EUtkGcCbU5+P5xc95WcECcMX76+F5U8UCUNPr29F5V8cCcK+1D7/nYwMLQJOxJ8P5/IIF4PVNON/RgCkK+HvgwzoWf2f7UYAJaMkCn/j3X+Ln0e50Ufnu9S0/ORWVaWUA53mZULsejxoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMjFUMDE6Mzg6MDcrMDg6MDDbLIQqAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTIxVDAxOjM4OjA3KzA4OjAwqnE8lgAAAABJRU5ErkJggg==) no-repeat;
        background-size: 100%;
    }

    .icon-xiu:before {
        background: url(data:image/png;base64,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) no-repeat;
        background-size: 100%;
    }

    .icon-shipin:before {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEUAAAD/gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ8AAABNJfp7AAAASHRSTlMAMraZHgCEWXlHIAiDRwp84IsBU6Mx4Rmn6Ql2bwU2+Ew+DfALtIEtxBgAArkBxREEa08tIldK1s9KNgdyF6Iv2wFPCXgXcnAwFb67AAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EEFQEmB9/zH1oAAAEDSURBVFjD7dZJUwIxEAXgRlE2EWRxA2QTVFYVQVxQZH3//xfJFM5UoEIlk+bgIe/YqfdVJZc0kY2Nzd4SOIBGDoM76kfHOnUnITkQ1u0DEVk/qt8HYhLgxA8Q3+yeJgBK+gHOxHoq7YzITx8ZoZ89Bwe4uPwbbQFXesB1zhuJQL6wOrspqoGSMBKA8vq0UlUAtzVIgbp7vTsFcA858OACDQWAHUDTe+GWGdD2gI4Z0HX7j4ZXeHKBZ0MAvXX/BaYA+s7xAOYA8DoEWIAqFvg3wBsXoHcuQB+fTIBo9MUEiL7HTIB+JkyAaDoD629cZb5Ysn7n/ewH7A2FvyOxtzQbGxsnv0ScLR/yXekfAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTIxVDAxOjM4OjA3KzA4OjAw2yyEKgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yMVQwMTozODowNyswODowMKpxPJYAAAAASUVORK5CYII=) no-repeat;
        background-size: 100%;
    }

    .icon-jingcaiduanzi2:before {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA/1BMVEUAAAD/gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ8AAAAq8aGSAAAAU3RSTlMAPZvg7TniDifpOuIOMeIODeIOeeIO4g7iDuIO4g7iDuIO4g7iDuIOOuIOUMniDqI64g4UUuKuAZkFVQK0DT13e9aw2tpISAC0tAAJxcUJAGhoALs0LfgAAAABYktHRACIBR1IAAAAB3RJTUUH4QQVASYH3/MfWgAAAQlJREFUWMPt0llPAkEQBOBWVA4VFAFvFJFDxPs+uRUQFKz//198M3EYZ+z0ZtdNth57U9/DThE5manp0Iwus0RzYXs9EsUviRFhfsHWXwRMAOIJc38JFgDLSSOwYgWQSpsA2AFkVoUA1taFADY2hQC2toUAsjtCALs5IYC9vBDAfkEIoFhiAmX180GFBxwSVX9ejo5ZwAnRqXI6O+cAuCC6VE5XLOD6hqwxAri9EwLA/YMQmEgA/Gvg0Rw78GScy7MLQM0cP7xCADgAeL9EMeD9TwwAB4C6Jg0OoBuSu0BTExbg/Sv4F2gx+20V6DCBFxV47bL6vf7E2t4GjP7wXbPXj9Gf++PP79YXQf9B3rDv7uYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMjFUMDE6Mzg6MDcrMDg6MDDbLIQqAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTIxVDAxOjM4OjA3KzA4OjAwqnE8lgAAAABJRU5ErkJggg==) no-repeat;
        background-size: 100%;
    }

    .icon-tuijian:before {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD5klEQVR4Xu1b7VHbQBB9mwZCKoipIKSCOBWEVAByA4EG4nMFmAaQqQBSAVABpoJAB6aCzezqZMsfknz2+STHpxl+MDrJt2/fftzuinDgF1XJzyY9B3C25xjdkklGZTJUAzBIDYD+ngMwoH4icqy8IgCVJhAZEE0g+oDoBGMUiGEw5gExEdpvBNqSCfItmCQnPwHhajWm/AKmC71HPAToiwfs2wIAdCNs0i4IDyUAPFG/15V7bNJnEE4OCwDGK5nkWAEYpOxBeHlFQAYwvpNJHj1tvPI1DgBFANpyHF7HB7xQv6d2z4ObCUAfPbApIAOqd1sAgA1AY4DP54XkmRMc3DwC9O3/AYDxCujfkTomk9xbTY8AyspujAmAsRVawqWs3fZqDQOsIDyjuUlPQbjbVsKa5wMCwLgsaLBsXxLqhAkS68Xe3bXsliQFBSBIGGQ3/xAUAEl1xY6XMzjiN+r3pMyea74kHa41CGGPZJOd2pXZgoAAlO6I38HUJZOM2aRC+b+eHNw6GLQAAMZP8fpW+AcQv1umuNu/ssspP2gYAEaSd2bYpCkIYgaVm6pSq6P9N2wC88LPToGMET5wabsqB4B+956KYLBJxe7vHE+JTTBAbf48T3as46s4Bi/qnJ+kLiA+wyZLZ2AyDo6v+MLQAPAbmE6nmzfpEZlkUl0HKOzX+ospaMCVo8YX0QwKwDUYRgS2AqQApDv76ADAVxstJBV+XsfNN58JZjm8ePppLWDq8GyNYApA8f/VOx9bxkiEyPOJSc6o/BEHZxiIAYxLMsnQhjqhrSY9KAFgW822D4BM2ATArzmbXQZAHJuaCAha/5u7ZuvrhjPWPS0GYkCZShcBqFN9vt5faz4C0GxJLDIgqxQ7hMFjqRfwwZhAVkTJOkbQvkBWLDkgACTGf1qR8z9smPo2mgku+3g5+BBewehMc4Pl0DcEYaJrst6hj5ZY/isNR4G6sLf7+xGAZsPg7jVc9wuRAZEBcVY4DkvHafEyTxnH5atiiMd8vC5U7fJ+W8OgdIdomEnOF47dHhfA2gaA1vxHi9/x6PdJpBMjPqZCigC1BQAdlBwuVneXzkUyM0DKCF8fazUJgDZJhOai8awQuual1WXChZ0j+rzmY6uWNQGA0ly0rXNA216sozTKik3MIxQA2vK+lx5eXtXZVvAV5tEByYQZTh2c5q4BUJrLpu5dab4pQLb5IqyQcbs689gVAPzH0jzIaGwZWFmxVc3jR8kanwBo7B6BIfatxcu2XDo7MHOaxQlTHwDoHL8IXTvU0AZAbE4hrJDvDbYAQOglLbxAE+C+wVPzqNl/5WHI94ba+L5/ZfvxXyWSOKIAAAAASUVORK5CYII=) no-repeat;
        background-size: 100%;
    }
</style>
