<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-8  col-lg-6 mt-5">
        <label for="search" class="form-label">
          Quel produit recherchez vous ?
        </label>
        <input
          v-model="searchKey"
          type="search"
          class="form-control mb-3"
          id="search"
          placeholder="Rechercher..."
          autocomplete="off"
          v-on:change="filterArticle"
        />
        <span v-if="searchKey && filteredArticles.length   > 0" class="font-weight-bold " >
            Article<span v-if="filteredArticles.length > 1">s</span> trouvé {{filteredArticles.length}} 
        </span>
        <span v-if="filteredArticles.length == []" class="font-weight-bold " >
            Votre recherche correspond avec aucun de nos articles !! 
        </span>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mt-5"
        v-for="article in filteredArticles"
        :key="article.id"
      >
        <div class="card">
          <div class="card-header text-center ">
            <p  style="font-size: 15px; height: 65px;">{{article.label}}</p>
          </div>
          <div class="card-body">
            <img :src="article.media.data[0].url" alt="image" 
                  style="
                    height: 200px;
                    width: 100%;
                    object-fit: contain;"/>
          </div>
          <div class="card-footer text-center">
            <div class="row  btn btn-primary ">
              <div class="col-sm-12 ">
                <router-link :to="{ name: 'article', params: { articleId: article.id }}" class="text-white">Article</router-link>
                <!-- <img v-bind:src="article.media.data[0].url" alt="test"> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import axios 
import http from 'axios'

export default {

    name: 'Articles',
    data() {
        return  {
            content: "Mon acticle",
            articles: [],
            filteredArticles: [],
            searchKey: "",
            labels: [],
            images:[],
            id:[],
            page: 1
        }
    },
    
    mounted() {
      try {
        http.request({
        method: 'get',
        url:'https://api-gateway.leroymerlin.fr/api-product/v2/products', 
        headers: { 
            'X-Gateway-APIKey':'vx64AonXBZVIIDkvhZHskyQLEN15iLk2', 
        }, 
        params: {
            'storeId': 28,
            'pubweb': true,
            'published': true,
            'expand': 'media(isReference:true)',
            'webmetadata': true,
         },
      }).then((response) => {
        this.filteredArticles = response.data['data']
        this.articles = this.filteredArticles
      })
      // }).then( response => this.articles = response.data['data'])
      } catch (error) {
        console.log(error)
      }
    },

    methods: {
       filterArticle(e) {
        if (e.srcElement.value.length != 0)
         try {
          http.request({
            method: 'get',
            url:'https://api-gateway.leroymerlin.fr/api-product/v2/products/_search', 
            headers: { 
                'X-Gateway-APIKey':'vx64AonXBZVIIDkvhZHskyQLEN15iLk2', 
            }, 
            params: {
                'storeId': 28,
                'pubweb': true,
                'published': true,
                'expand': 'media(isReference:true),media(web:true)',
                'webmetadata': true,
                'page': this.page,
                'size': 10,
                'q': e.srcElement.value
            },
        }).then((response) => {
          this.filteredArticles = response.data['data']
        })
        // }).then( response => this.articles = response.data['data'])
        } catch (error) {
          console.log(error)
        } else {
          this.filteredArticles = this.articles;
          console.log(this.articles)
        }
      },
    },
  }
</script>

<style scoped></style>
