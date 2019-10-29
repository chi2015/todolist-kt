<template>
    <div class="paginator" v-if="pagesCount > 1">
        <router-link :to="`/1`"><div v-bind:class="{ active: isActive(1), page: true }">1</div></router-link>
        <div v-if="page > 3">...</div>
        <router-link :to="`/${page - 1}`"><div class="page" v-if="page > 2">{{page - 1 }}</div></router-link>
        <div class="page" v-if="pagesCount > 2 && page > 1 && page < pagesCount" v-bind:class="{ active: isActive(page) }"><router-link :to="`/${page}`">{{page}}</router-link></div>
        <router-link :to="`/${page + 1}`"><div class="page" v-if="page < pagesCount - 1">{{page + 1 }}</div></router-link>
        <div v-if="page < pagesCount - 2">...</div>
        <router-link :to="`/${pagesCount}`"><div v-bind:class="{ active: isActive(pagesCount) , page: true }">{{ pagesCount }}</div></router-link>
    </div>
</template>

<script>
export default {
    name: 'Paginator',
    created() {
      this.perPage = this.$store.getters.PER_PAGE
    },
    computed: {
        page() {
            return this.$store.getters.PAGE
        },
        pagesCount() {
            return this.$store.getters.PAGES_COUNT
        }
    },
    methods: {
        isActive(page) {
            return page == this.page
        }
    }
}
</script>

<style scoped>
   .paginator .page.active {
       font-weight: bold;
       background-color: #946039;
       border: 1px black solid;
   }
   .paginator {
       display: flex;
       width: 90%;
       flex-direction: row;
       justify-content: flex-start;
       align-items: center;
   }
   .paginator .page {
       cursor: pointer;
       
       border-radius: 60%;
       width: 40px;
       height: 40px;
       font-size: 20px;
       margin: 5px;
       background-color: #fd8226;
       color: white;
       line-height: 40px;
   }

   a {
       text-decoration: none;
       color: white;
   }
</style>