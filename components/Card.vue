<template>
    <div :class="$style.card">
        <div :class="$style['card-img']">
            <img :src="cardData.photo" draggable="false">
            <div :class="$style['card-rating']">
                <Rating :rating="cardData.rating" :id="cardData.id"/>
            </div>
            <CartButton 
                :class="$style['cart-button']"
                @click="$emit('toggleBuying')" 
                :small="true" 
                :inCart="inCart"
            />
        </div>
        <div :class="$style['card-body']">
            <h5 :class="$style['card-text']">{{cardData.name}}</h5>
            <p :class="$style['card-price']">{{formatedPrice}} ₽</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
        },
        computed: {
            cardData() {
                return {
                    ...this.product,
                    'photo': `https://front-test.idalite.com${this.product.photo}`
                }
            },
            formatedPrice() {
                const price = this.cardData.price.toString()
                let formated = price
                if (price.length > 3) {
                    formated = price.substring(0, price.length - 3) + ' ' + price.substr(price.length - 3)
                }
                return formated
            },
            inCart() {
                return this.$store.getters.cartItemsIds.indexOf(this.product.id) >= 0
            }
        }
    }
</script>

<style lang="scss" module>
.card {
    width: 264px;
    max-height: 272px;
    padding: 16px;
    margin: 0 auto;
    background-color: var(--white);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    cursor: pointer;
    transition: .3s;
    &:hover{
        transform: scale(1.02)
    }
    &:active{
        transform: none;
    }
    & .card-img {
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        user-select: none;
        & img {
            max-width: 100%;
            max-height: 100%;
        }
        & .card-rating {
            position: absolute;
            left: 0;
            top: 0;
        }
        & .cart-button {
            position: absolute;
            right: 0;
            top: 0;
        }
    }
    & .card-body {
        margin-top: 16px;
        font-size: 14px;
        line-height: 18px;

        & .card-text {
            margin-bottom: 6px;
            font-size: inherit;
            color: var(--grey);
            font-weight: 400;
        }
        & .card-price {
            color: var(--black);
            font-weight: 700;
        }
    }
}
@media (max-width: 375px) {
    .card {
        width: 100%;
    }
}
</style>