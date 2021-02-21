<template>
  <div :class="$style.section">
      <div :class="$style.control">
        <h1>Каталог</h1>
        <Dropdown @change="changeSortingParameter" :options="sortingOptions"/>        
      </div>
      <div :class="$style.content">
          <Navigation :categories="categories"/>
          <NuxtChild />
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  async asyncData() {
    const categories = await fetch('https://front-test.idalite.com/api/product-category')
      .then(res => res.json())
    return { categories }
  },
  mounted() {
    this.initCart(JSON.parse(localStorage.getItem('cart')))
    if (!this.$route.params.id) {
      this.$router.push(`/category/${this.categories[0].id}`)
    }
  },
  data() {
    return {
      categories: []
    }
  },
  computed: {
      ...mapState(['sortingOptions'])
  },
  methods: {
      ...mapActions(['changeSortingParameter', 'initCart']),
  },
}
</script>


<style lang="scss" module>
.section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 86px;
  color: var(--black);
  & .control {
    display: flex;
    flex-shrink: 0;
    padding: 32px 0 24px;
    align-items: center;
    justify-content: space-between;
  }
  & .content {
    display: flex;
    flex: 1;
    padding-bottom: 60px;
  }
}
@media (max-width: 1200px) {
    .section {
        padding: 0 50px;
    }
}
@media (max-width: 992px) {
    .section {
        padding: 0 36px;
    }
}
@media (max-width: 768px) {
    .section {
      padding: 0 24px;
      & .control {
        padding: 24px 0;
        & h1 {
          font-size: 24px;
        }
      }
      & .content {
        flex-direction: column;
      }
    }
}
@media (max-width: 576px) {
    .section {
      padding: 0 18px;
    }
}
@media (max-width: 375px) {
    .section {
      padding: 0 12px;
      & .control {
        & h1 {
          font-size: 20px;
        }
      }
    }
}
</style>

