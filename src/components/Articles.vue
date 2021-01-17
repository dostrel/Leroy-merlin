<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-4 mb-3 mt-5">
        <label for="search" class="form-label">
          Quel produit rechercher vous ?
        </label>
        <input
          v-model="searchKey"
          type="search"
          class="form-control mb-3"
          id="search"
          placeholder="Rechercher..."
          autocomplete="off"
        />
        <span v-if="searchKey && filterArticle.length   > 0" class="font-weight-bold " >
            Article<span v-if="filterArticle.length > 1">s</span> trouvé {{filterArticle.length}} 
        </span>
        <span v-if="filterArticle.length == []" class="font-weight-bold " >
            Votre recherche correspond avec aucun de nos articles !! 
        </span>
      </div>
    </div>
    <div class="row">
        <button @click="getArticleName" class="btn btn-primary">label</button>
        <!-- <button @click="getArticleImage" class="btn btn-success">image</button> -->
      <div
        class="col-sm-3 mt-5"
        v-for="article in articles"
        :key="article.id"
      >
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12 " v-for="label in labels" :key="label">
                <h5 @click="getArticleId" class="">{{label}}</h5>
                  
               
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
            searchKey: "",
            labels: [],
            images:[],
            id:[]
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
            'expand': 'media',
            'webmetadata': true,
         },
      }).then( response => this.articles = response.data['data'])
        this.getArticleName()
        //.then( response => console.log(response.data['data']));
      } catch (error) {
        console.log(error)
      }
    },

    computed: {
        filterArticle() {
            return this.labels.filter((label) => {
                return label.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        },
    },

    methods: {
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
