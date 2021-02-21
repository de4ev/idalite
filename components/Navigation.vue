<template>
    <nav :class="$style.nav">
        <ul>
            <li 
                v-for="(link) in categories" :key="link.id"
                :class="$style['list-item']"
            >
                <nuxt-link :to="`/category/${link.id}`" :class="`${$style.link} ${$route.params.id == link.id ? $style['link-active'] : ''}`">{{link.name}}</nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            categories: {
                type: Array,
                required: true
            }
        }
        
    }
</script>

<style lang="scss" module>
.nav {
    flex-shrink: 0;
    min-width: 100px;
    margin-right: 10px;
}
.list-item {
    list-style-type: none;
    &:not(:last-child) {
        margin-bottom: 16px;
    }
    & .link {
        font-size: 16px;
        line-height: 21px;
        text-decoration: none;
        color: var(--grey-light);
        white-space: nowrap;
        transition: .3s;
        &:hover {
            color: var(--grey);
        }
        &.link-active {
            color: var(--black);
            text-decoration: underline;
        }
    }
}

@media (max-width: 768px) {
    .nav {
        border: 1px solid var(--grey-light);
        border-right: none;
        border-left: none;
        width: 100%;
        padding: 8px 0;
        margin-bottom: 40px;
        & ul {
            display: flex;
            justify-content: center;
            justify-content: space-between;
            & .list-item {
                margin: 0;
                text-align: center;
            }
        }
    }
}

@media (max-width: 375px) {
    .nav {
        border: 1px solid var(--grey-light);
        border-right: none;
        border-left: none;
        width: 100%;
        padding: 8px 0;
        margin-bottom: 40px;
        & ul {
            display: flex;
            justify-content: center;
            justify-content: space-between;
            & .list-item {
                margin: 0;
                text-align: center;
            }
        }
    }
}
@media (max-width: 340px) {
    .nav {
        & ul {
            flex-direction: column;
        }
    }
}
</style>