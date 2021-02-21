<template>
    <div :class="$style.card">
        <div :class="$style['card-img']">
            <img :src="cardData.photo" draggable="false">
        </div>
        <div :class="$style['card-body']">
            <h5 :class="$style['card-text']">{{cardData.name}}</h5>
            <p :class="$style['card-price']">{{formatedPrice}} ₽</p>
            <div :class="$style['card-rating']">
                <Rating :rating="cardData.rating" :id="cardData.id"/>
            </div>
        </div>
        <Button 
            @click="$emit('toggleBuying')" 
            :class="$style['card-btn']" 
            :small="true"
        >
            <img src="@/assets/icons/trash.svg">
        </Button>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
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
            }
        }
    }
</script>

<style lang="scss" module>
.card {
    display: flex;
    align-items: center;
    height: 120px;
    padding: 12px 16px;
    background-color: var(--white);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    transition: .3s;
    &:hover {
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1)
    }
    & .card-img {
        height: 90px;
        margin-right: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        user-select: none;
        & img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    & .card-body {
        display: flex;
        align-self: stretch;
        flex-direction: column;
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
        & .card-rating {
            margin-top: auto;
        }
    }
    & .card-btn {
        margin-left: auto;
    }
}
</style>