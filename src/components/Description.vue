<template lang="en">
  <div>
        <div>
            <h1>{{ article.label }}</h1>
        </div>
        <carousel  
          :perPage="1"
>       <slide 
            v-for="medium in media"
            :key="medium.mediaID"   v-if="medium.type != 'DOC'"
        >
            <div class="container">
                <div class="row">
                    <div>
                        <img v-bind:src="medium.url" 
                        style="
                        height: 300px;
                        width: 300px;
                        object-fit: contain;" />
                    </div>
                </div>
            </div>
        </slide>
        </carousel>
        <div 
            v-for="characteristic in characteristicsList"
                :key="characteristic.code"
            >
            <p>
                {{characteristic.label}} : {{characteristic.values[0]}}
            </p>
        </div>
        
</div>
</template>
<script>
import http from "axios";
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: "Article",
    components: {     Carousel,
    Slide
 },

  data() {
    return {
      article: [],
      characteristicsList: [],
      media: [],
      slickOptions: {
                slidesToShow: 1,
                // Any other options that can be got from plugin documentation
        },
    };
  },
  mounted() {
    try {
      http
        .request({
          method: "get",
          url:
            "https://api-gateway.leroymerlin.fr/api-product/v2/products/" +
            this.$route.params.articleId,
          headers: {
            "X-Gateway-APIKey": "vx64AonXBZVIIDkvhZHskyQLEN15iLk2",
          },
          params: {
            storeId: 28,
            pubweb: true,
            published: true,
            expand: "media(web:true),characteristics",
            webmetadata: true,
          },
        })
        .then((response) => {
          this.article = response.data;
          this.characteristicsList = this.article.characteristics.data;
          this.media = this.article.media.data;
          console.log(this.media);
        });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
        next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },
  },
};
</script>
<style lang="en">
</style>
