<template>
    <div :class="$style.wrapper">
        <div v-if="$fetchState.pending || $fetchState.error" :class="$style.center">
            <Loader v-if="$fetchState.pending " color="#F2C94C"/>
            <p v-else-if="$fetchState.error || products.length < 1">An error occurred :(</p>
        </div>
        
        <transition-group v-else name="list" :class="$style['cards-container']">
            <Card 
                v-for="product in sortedProducts"
                @toggleBuying="updateCart(product)"
                :key="product.id" 
                :product="product"
            />
        </transition-group>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    async fetch() {
      this.products = await fetch(
        `https://front-test.idalite.com/api/product?category=${this.$route.params.id}`
      ).then(res => res.json())
    },
    data() {
      return {
        products: []
      }
    },
    watch: {
        '$route.query': '$fetch'
    },
    computed: {
        ...mapState(['sortBy', 'cart']),
        sortedProducts() {
            if (this.products.length > 0) {
                const copy = this.products.slice()
                let sorted
                if (this.sortBy.value == 'price') {
                    sorted = copy.sort((a, b) => a[this.sortBy.value] - b[this.sortBy.value])
                } else {
                    sorted = copy.sort((a, b) => b[this.sortBy.value] - a[this.sortBy.value])
                }
                return sorted
            }
        },
    },
    methods: {
        ...mapActions(['toggleBuying']),
        updateCart(product) {
            this.toggleBuying(product)
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }, 
}
</script>

<style lang="scss" module>
.wrapper {
    display: flex;
    width: 100%;
    flex-grow: 1;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}
.cards-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
}
</style>