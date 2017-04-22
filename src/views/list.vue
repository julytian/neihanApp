<template>
  <div>
    <!-- 全局header -->
    <nh-head :page-type="getTitleStr(searchKey.content_type)" ref="head" :fix-head="true">
    </nh-head>
    <section id="page">
      <!-- 更新信息 -->
      <div class="info-tip" v-show="tipShow">
        {{tip}}
      </div>
      <ul class="jokes-list">
        <li v-for="(item,index) in jokesFilter" v-if="item.group" :key="item">
          <div class="user-info" :style="{paddingLeft: item.group.is_neihan_hot?'0':'10px'}">
            <div class="hot-wrap" v-if="item.group.is_neihan_hot">
                <span>热门</span>
            </div>
            <img class="user-avatar" :src="item.group.user.avatar_url">
            <div class="user-name">{{item.group.user.name}}</div>
            <div class="icon-close" @click="deleteJoke(index)" @touchend="deleteJoke(index)">&times;</div>
          </div>
          <!-- 内容 -->
          <div class="nh-content">
            <div class="nh-content-wrapper">
              {{item.group.content}}
              <div class="nh-bar-link">
                <div class="link-text">
                  <span>{{item.group.category_name}}</span>
                </div>
              </div>
            </div>

            <!-- 假如有视频存在 -->
            <div v-if="item.group.is_video && item.group.is_video == 1">
              <d-player :video="item.group.videoPlayer" :autoplay="autoplay" :loop="loop">
              </d-player>
            </div>
            <!-- gif视频 -->
            <div v-if="item.group.is_gif && item.group.is_gif == 1">
              <d-player :video="item.group.gifPlayer" :autoplay="autoplay" :loop="loop">
              </d-player>
            </div>
            <!-- 爆笑囧图 一张-->
            <div class="preview-wrapper" style="max-height:632px;" v-if="item.group.media_type && item.group.media_type == 1">
              <img class="preview-img nh-pic" :src="item.group.thumbOne" @click="thumbClick(item.group)">
              <div class="long-img-bg" v-if="item.group.middle_image.height>1000" @click="thumbClick(item.group)">
                <span>点击查看长图</span>
              </div>
            </div>
            <!-- 爆笑囧图 多张-->
            <div class="thumb-list" v-if="item.group.thumb_image_list">
              <img class="preview-img thumb-item nh-pic" v-for="(thumb, index) in item.group.thumb_image_list" :key="index" :src="thumb.url"
                @click="thumbListClick(index, item.group.large_image_list)">
            </div>

            <!-- footer 点赞评论分享 -->
            <ul class="action-btn-list">
              <li class="btn digg-item">
                <span>{{item.group.digg_count}}</span>
              </li>
              <li class="btn bury-item">
                <span>{{item.group.bury_count}}</span>
              </li>
              <li class="btn comment-item">
                <span>{{item.group.comment_count}}</span>
              </li>
              <li class="btn share-item" @click="shareOpen(item.group.text,item.group.cover_image_uri,item.group.share_url)">
                <span>{{item.group.share_count}}</span>
              </li>
            </ul>

          </div>
        </li>
      </ul>
      <!-- 加载更多 -->
      <div class="loadMore" v-if="loadMore">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span> 数据加载中...
      </div>
      <!-- 分享 -->
      <nhShare v-if="shareFlag" :share-open="shareFlag" :share-title="shareText" :share-pic="shareImageUri" :share-url="shareUrl"
        @shareClose="shareClose">
      </nhShare>
      <!-- 刷新 -->
      <div class="refresh-btn-wrapper">
        <span class="refresh-btn" :class="{spinner: refreshFlag}" @click="refreshPage"></span>
      </div>

    </section>
  </div>
</template>
<script>
    import $ from 'webpack-zepto';
    import VueDPlayer from 'vue-dplayer';
    import utils from '../libs/utils.js';
    import nhHead from '../components/header';
    import nhShare from '../components/share';
    require('../assets/scss/index.scss');

    export default {
        name: 'list',
        components: {
            "d-player": VueDPlayer,
            nhHead,
            nhShare
        },
        data() {
            return {
                scroll: true,
                searchKey: {
                    essence: 1, // 固定值 1
                    content_type: -101, // 从获取 content_type 中获取得到的 list_id 字段值。目前推荐的是-101，视频的是-104，段友秀的是-301，图片的是-103，段子的是-102
                    iid: 9234212697, // 一个长度为10的纯数字字符串，用于标识用户唯一性
                    os_version: "10.3.1", // 操作系统版本号，例如7.1.0
                    os_api: 18, // 操作系统版本，例如20
                    app_name: "joke_essay", // 固定值joke_essay
                    channel: "App Store", // 下载渠道，可360、tencent等
                    device_platform: "iphone", // 设备平台，android 或 ios
                    idfa: "C1A098F7-F4FD-4637-8ADD-C2E80284C0D8", //
                    live_sdk_version: 130,
                    vid: "60557D26-38D4-44D4-AE1B-3B8573EA465C",
                    openudid: "06c3fa553c55ede174948ed86a46958580c7bde6", // 一个长度为16的数字和小写字母混合字符串
                    device_type: "iPhone 6S", // 设备型号，例如 hongmi
                    version_code: "6.1.5",
                    ac: "WIFI", // 网络环境，可取值 wifi
                    screen_width: "750", // 屏幕宽度，px为单位
                    device_id: "35453050449",
                    aid: "7", // 固定值7
                    city: "广州",
                    count: 30, // 返回数量
                    double_col_mode: 0,
                    latitude: 23.20186538475997, // 经度。可为空
                    longitude: 113.3148468443627, // 纬度。可为空
                    message_cursor: 0,
                    mpic: 1
                },
                jokes: [],
                autoplay: false,
                loop: false,
                loadMore: false,
                shareFlag: false,
                shareText: '',
                shareImageUri: '',
                shareUrl: '',
                refreshFlag: false,
                tip: '',
                tipShow: false
            }
        },
        mounted() {
            window.scrollTo(0, 0);
            this.tip = '';
            if (this.$route.query && this.$route.query.list_id) {
                this.searchKey.content_type = this.$route.query.list_id;
            }
            this.getLists(true);
            // 滚动加载
            $(window).on('scroll', utils.throttle(this.getScrollData, 300, 1000));
        },
        methods: {
            // 获取title文字
            getTitleStr(list_id) {
                let str = '';
                switch (list_id) {
                    case '-101':
                        str = '推荐';
                        break;
                    case '-104':
                        str = '视频';
                        break;
                    case '-301':
                        str = '段友秀';
                        break;
                    case '-103':
                        str = '图片';
                        break;
                    case '-102':
                        str = '段子';
                        break;
                    default:
                        str = '推荐';
                        break;
                }
                return str;
            },
            // 获取数据
            getLists(bool) {
                this.$http.jsonp('http://lf.snssdk.com/neihan/stream/mix/v1/', {
                    params: this.searchKey
                }).then((response) => {
                    let data = response.body.data;
                    this.scroll = true;
                    this.loadMore = false;
                    this.refreshFlag = false;
                    this.tipShow = false;
                    this.loadMore = true;
                    if (data) {
                        if (bool) {
                            this.tip = data.tip;
                            this.jokes = this.jokes.concat(data.data)
                        } else {
                            this.tip = data.tip;
                            this.jokes = data.data;
                        }
                    } else {
                        this.refreshFlag = true;
                        setTimeout(() => {
                            bool ? this.getLists(true) : this.getLists();
                        }, 3000);
                    }
                }, (error) => {
                    console.log(error)
                });
            },
            // 滚动加载数据
            getScrollData() {
                if (this.scroll) {
                    let totalheight = $(window).height() + $(window).scrollTop();
                    if ($(document).height() <= totalheight + 300) {
                        this.scroll = false;
                        this.refreshFlag = true;
                        this.getLists(true);
                    }
                }
            },
            // 单图预览
            thumbClick(item) {
                this.$preview.open(0, [{
                    w: item.large_image.width,
                    h: item.large_image.height,
                    src: item.large_image.url_list["0"].url
                }]);
            },
            // 多图预览
            thumbListClick(index, list) {
                let arr = [];
                arr = list.map(function(item, index) {
                    return Object.assign({}, item, {
                        w: item.width,
                        h: item.height,
                        src: item.url
                    });
                });

                this.$preview.open(index, arr, {
                    captionEl: true,
                    fullscreenEl: true,
                    history: true,
                    shareEl: false,
                    tapToClose: true
                });

            },
            // 删除单条
            deleteJoke(index) {
                this.jokesFilter.splice(index, 1);
            },
            // 分享
            shareOpen(text, imageUrl, linkUrl) {
                this.shareFlag = true;
                this.shareText = text;
                this.shareImageUri = imageUrl ? 'http://p1.pstatp.com/large/' + imageUrl : '';
                this.shareUrl = linkUrl;
            },
            // 取消分享
            shareClose() {
                this.shareFlag = false;
            },
            // 刷新并返回顶部
            refreshPage() {
                window.scrollTo(0, 0);
                this.refreshFlag = true;
                this.tipShow = true;
                this.getLists();
            }
        },
        computed: {
            jokesFilter: function() {
                let jokesNew = this.jokes.map((item, index) => {
                    if (item.group && item.group.is_video && item.group.is_video == 1) {
                        let videoUrl = '';
                        if (item.group.hasOwnProperty('mp4_url')) {
                            videoUrl = item.group.mp4_url;
                        } else {
                            videoUrl = 'http://ic.snssdk.com/neihan/video/playback/?video_id=481c0048fb3c48e4ab9f8f2619e0a299&quality=480p&line=0&is_gif=0&device_platform=iphone.mp4'
                        }
                        item.group.videoPlayer = {
                            url: videoUrl,
                            pic: item.group.medium_cover.url_list["0"].url
                        }
                    }
                    if (item.group && item.group.is_gif && item.group.is_gif == 1 && item.group.gifvideo) {
                        let gifUrl = '';
                        if (item.group.gifvideo.hasOwnProperty('mp4_url')) {
                            gifUrl = item.group.gifvideo.mp4_url;
                        } else {
                            gifUrl = 'http://ic.snssdk.com/neihan/video/playback/?video_id=a3c0bfb31958474c80b5acbf921f1622&quality=480p&line=0&is_gif=1&device_platform=None.mp4'
                        }
                        item.group.gifPlayer = {
                            url: gifUrl,
                            pic: item.group.middle_image.url_list["0"].url
                        }
                    }
                    if (item.group && item.group.media_type && item.group.media_type == 1) {
                        item.group.thumbOne = item.group.middle_image.url_list["0"].url
                    }
                    return item;
                });

                this.jokes = jokesNew.filter(function(item, index) {
                    return !item.ad;
                });
                return this.jokes;
            }
        },
        watch: {
            // 切换页面
            '$route' (to, from) {
                // 如果是当前页面切换分类的情况
                if (to.query && to.query.list_id) {
                    this.searchKey.content_type = to.query.list_id;
                    this.jokes = [];
                    this.loadMore = true;
                }
                this.getLists(true);
                // 隐藏导航栏
                this.$refs.head.show = false;
            }
        },
    }
</script>
<style lang="scss">
    .info-tip {
        position: fixed;
        left: 0;
        top: 44px;
        display: block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(255, 129, 159, .8);
        color: #fff;
        font-size: 12px;
        z-index: 999;
    }

    .jokes-list {
        height: 100%;
        background: #dedede;
        >li {
            background-color: #fff;
            margin-bottom: 3px;
        }
    }

    .user-info {
        display: flex;
        align-items: center;
        padding: 10px;
        .hot-wrap{
            margin:0 auto;
            font-size:12px;
            width:20px;
            line-height:1.5;
            text-align:center;
            background: #ff819f;
            color:#fff;
            margin-right:1px;
            transform: scale(.6);
        }
        .user-avatar {
            display: block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            border: 1px solid #f3f3f3;
        }
        .user-name {
            flex: 1;
            color: #787878;
        }
        .icon-close {
            color: #ff819f;
            border-radius: 5px;
            font-size: 30px;
            padding: 0 5px;
        }
    }

    .nh-content {
        font-size: 16px;
        color: #333;
        word-break: break-all;
        word-wrap: break-word;
        line-height: 1.5;
        &-wrapper {
            padding: 5px 10px;
        }
        .action-btn-list {
            display: flex;
            font-size: 14px;
            align-items: center;
            justify-content: center;
            height: 45px;
            .btn {
                flex: 1;
                text-align: center;
            }
            .btn span {
                display: inline-block;
                text-align: left;
                background-repeat: no-repeat;
                padding-left: 25px;
                background-size: auto 60%;
                line-height: 30px;
                box-sizing: border-box;
                white-space: nowrap;
            }
            .digg-item span {
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAP1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzFR7UUAAAAFHRSTlMAHt938PzJjQUQmE861aqpfW5WLxpLLXgAAAB+SURBVCjPrdBJDsIwEETR9th2Eua6/1lBkUBYsfgb/vqpFmXHwsm7/SpEqTYA0kpAiYBWAqUDUCWgKwE9CESbdtanmt7dwpfImpU3095LaF5FUVDoDxsRhZMogcTFSGwkqpG4k4iNRDIQuZNwG0SevDUKP4jFRtF8XMlL28ETgFgt8tnmHnEAAAAASUVORK5CYII=);
                background-position: left 5px;
            }
            .bury-item span {
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAOVBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz15oL/AAAAEnRSTlMAH9+I7/zJkHUKUdSqNxfhmC76jFC/AAAAgElEQVQoz6XPSQ6DQBBDUTddPTIk8f0PGyVSKAIIL/jrJ0sGvwFoxbjNSsMnF4X7njthB5HCv+CxKIU1JVileEjBLkWWgrMUkxQpKMEoxSBFkoK4v5GxZqfAZhcT18b4qwZ4y7B5eF5w8pKkQpEMRdIiSYciFYp0CJJxWRhLg/cGqOMpfVnLTBcAAAAASUVORK5CYII=);
                background-position: left 8px;
            }
            .comment-item span {
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAElBMVEUAAADMzMzMzMzMzMzMzMzMzMyxZd59AAAABXRSTlMA7o6ABs2AO04AAAA+SURBVBjTY3ASDUWAQBUG1VBkEMQgisIPZAhFBaN8vHz08ApC5QPDOzQ0mAEZhIYaoPJRpRnQpBnQpBnQpAGK5HnV4Uw80wAAAABJRU5ErkJggg==);
                background-position: left 8px;
            }
            .share-item span {
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAVFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzg5ipKAAAAG3RSTlMAS/f8QGF4aVhHEQPs3MW7oFEn0LirgG9NMZTadDR6AAAApUlEQVQoz82SSRKDIBBFFdEoKCAOifn3v2cqKYqhmLL0LeHRfOhu6sDjYVfpVDNa8vKMVOUWZK0Z6MaCwegbVokNPQgTq+sTBh9FED0y1gUhz9BgOyIG37hmJBicQQlSnNbQrkL6FmYy5pMqWMi2HzJ6LTW7s+ov/v316Me232E1cdcXIxhjAiB6VujcsZy63H1qqtcnKDOFTR4pawZwK6PAf0adD3EtJfZ0oWPxAAAAAElFTkSuQmCC);
                background-position: left 8px;
            }
        }
    }

    .nh-bar-link {
        display: inline-block;
        border-radius: 5px;
        .link-text {
            display: inline-block;
            min-width: 3rem;
            height: 1.3rem;
            padding: 0 .5rem;
            line-height: 1.3rem;
            border-radius: 10px;
            border: 1px solid #5e96b4;
            color: #5e96b4;
            text-align: center;
            font-size: 14px;
            span {
                color: #5e96b4;
                display: block;
            }
        }
    }

    .nh-divider {
        width: 100%;
        height: .5rem;
        background-color: #f9f7f7;
    }

    .dplayer-full-in-icon {
        display: none;
    }

    .nh-pic {
        width: 100%;
    }

    .thumb-list {
        display: flex;
        flex-flow: wrap;
        .thumb-item {
            width: 32%;
            margin-left: 1%;
            margin-bottom: 1%;
            box-sizing: border-box;
        }
    }

    .preview-wrapper {
        position: relative;
        overflow: hidden;
        .long-img-bg {
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background: url(//s3.pstatp.com/resource/neihan_wap/static/image/long-img-bg_b8c6002.png) repeat-x center center;
            background-size: auto 100%;
            span {
                display: inline-block;
                font-size: 14px;
                color: #fff;
                height: 50px;
                line-height: 50px;
                padding-left: 30px;
                background: url(//s3a.pstatp.com/resource/neihan_wap/static/image/long-img-icon_e84cd76.png) no-repeat left center;
                background-size: auto 40%;
            }
        }
    }

    .loadMore {
        text-align: center;
        font-size: 16px;
        color: #ff819f;
        margin: 10px auto;
        height: 20px;
        span {
            display: inline-block;
            width: 2px;
            height: 100%;
            border-radius: 2px;
            background: #ff819f;
            animation: load 1s ease infinite;
        }
    }

    @keyframes load {
        0%,
        100% {
            height: 5px;
            background: #ff819f;
        }
        50% {
            height: 20px;
            margin: -5px 0;
            background: lightgreen;
        }
    }

    .loadMore span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .loadMore span:nth-child(3) {
        animation-delay: 0.4s;
    }

    .loadMore span:nth-child(4) {
        animation-delay: 0.6s;
    }

    .loadMore span:nth-child(5) {
        animation-delay: 0.8s;
    }

    .refresh-btn-wrapper {
        position: fixed;
        width: 50px;
        height: 50px;
        bottom: 20px;
        right: 10px;
        .refresh-btn {
            display: block;
            width: 100%;
            height: 100%;
            background: url(//s3a.pstatp.com/resource/neihan_wap/static/image/refreshicon_0e30755.png) no-repeat center center;
            background-size: 100%;
        }
        .refresh-btn.spinner {
            animation: rotator-anticlock .5s linear infinite;
        }
    }

    @keyframes rotator-anticlock {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-360deg);
        }
    }
</style>