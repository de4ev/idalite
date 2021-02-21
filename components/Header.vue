<template>
    <header :class="$style.header">
        <span :class="$style.logo">TestList</span>
        <CartButton @click="openPanel" :notificationsCount="cartCount" />
    </header>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['cartCount'])
        },
        methods: {
            ...mapActions(['togglePanel']),
            openPanel() {
                this.togglePanel(true)
            }
        },
    }
</script>

<style lang="scss" module>
.header {
    display: flex;
    flex-shrink: 0; 
    padding: 0 88px;
    justify-content: space-between;
    align-items: center;
    height: 66px;
    background-color: var(--white);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 0px 0px 8px 8px;
    & .logo {
        color: var(--grey);
        font-size: 22px;
        font-weight: 700;
        line-height: 28px;
    }
}
@media (max-width: 1200px) {
    .header {
        padding: 0 50px;
    }
}
@media (max-width: 992px) {
    .header {
        padding: 0 36px;
    }
}
@media (max-width: 768px) {
    .header {
        padding: 0 24px;
    }
}
@media (max-width: 576px) {
    .header {
        padding: 0 18px;
    }
}
@media (max-width: 375px) {
    .header {
        padding: 0 12px;
        height: 50px;
    }
}
</style>