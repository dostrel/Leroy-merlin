<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-4 mb-3 mt-5">
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
        <button @click="getArticleName" class="btn btn-primary">label</button>
        <!-- <button @click="getArticleImage" class="btn btn-success">image</button> -->
      <div
        class="col-sm-3 mt-5"
        v-for="article in filteredArticles"
        :key="article.id"
      >
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12 ">
            
                <h5 @click="getArticleId" class="">{{article.label}}</h5>
                <router-link :to="{ name: 'article', params: { articleId: article.id }}">Article</router-link>
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
        // this.getArticleName()
        this.filteredArticles = response.data['data']
        this.articles = this.filteredArticles
        console.log(this.articles)
      })
      // }).then( response => this.articles = response.data['data'])
      } catch (error) {
        console.log(error)
      }
    },

    watch: {
 
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
                'expand': 'media(isReference:true)',
                'webmetadata': true,
                'page': this.page,
                'size': 10,
                'q': e.srcElement.value
            },
        }).then((response) => {
          // this.getArticleName()
          console.log(response);
          this.filteredArticles = response.data['data']
        })
      // }).then( response => this.articles = response.data['data'])
      } catch (error) {
        console.log(error)
      } else {
        this.filteredArticles = this.articles;
      }
      },

        getArticleName() {
            this.labels = this.articles.map(function(labelArticle) {
                   return labelArticle['model']["label"];
            });
        },
         getArticleId() {
            this.id = this.articles.map(function(idArticle) {
                   return idArticle["id"];
            });
        },
        // getArticleImage() {
        //   try {
        //     http.request({
        //     method: 'get',
        //     url:`https://api-gateway.leroymerlin.fr/api-product/v2/products/{id}/media`, 
        //     headers: { 
        //         'X-Gateway-APIKey':'vx64AonXBZVIIDkvhZHskyQLEN15iLk2', 
        //     },
            
        //   })/* .then( response => this.articles = response.data['data']) */
        //       .then( response => console.log(response.data['data']));

        //   } catch (error) {
        //     console.log(error)
        //   }

         getDescriptionArticle() {
          try {
            http.request({
            method: 'get',
            url:`https://api-gateway.leroymerlin.fr/api-product/v2/products/{id}/characteristics`, 
            headers: { 
                'X-Gateway-APIKey':'vx64AonXBZVIIDkvhZHskyQLEN15iLk2', 
            },
            
          })/* .then( response => this.articles = response.data['data']) */
              .then( response => console.log(response.data['data']));

          } catch (error) {
            console.log(error)
          }
        }
    },
  }
</script>

<style scoped></style>
