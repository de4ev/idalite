<template>
    <div>
        <!-- Overlay -->
        <transition name="fade">
            <div v-if="isPanelOpen" @click="closePanel">
                <div :class="$style.overlay"></div>
            </div>
        </transition>
         <!-- Panel -->
        <transition name="slide" appear>
            <div v-if="isPanelOpen" :class="$style.panel">
                <div :class="$style['panel-header']">
                    <h2>Корзина</h2>
                    <Button :small="true" @click="closePanel">
                        <img src="@/assets/icons/close.svg">
                    </Button>
                </div>
                <!-- Empty cart -->
                <div v-if="cartCount < 1 && !orderCreated" :class="$style['empty']">
                    <p>Пока что вы ничего не добавили в корзину.</p>
                    <Button :wide="true" @click="closePanel" :class="$style['panel-button']">Перейти к выбору</Button>
                </div>
                <!-- Products in cart -->
                <div v-else-if="cartCount >= 1 && !orderCreated" :class="$style['not-empty']">
                    <p>Товары в корзине</p>
                    <div :class="$style['cart-products']">
                        <CardSmall 
                            v-for="product in cart" 
                            @toggleBuying="updateCart(product)"
                            :key="product.id" 
                            :product="product"
                        />
                    </div>
                    <!-- Order form -->
                    <p>Офорить заказ</p>
                    <form :class="$style.form">
                        <input 
                            v-model="client.name" 
                            @blur="validate" 
                            type="text" 
                            placeholder="Ваше имя"
                            id="input-name"
                        />
                        <p v-if="errors.name">Пожалуста, укажите Ваше имя</p>
                        <input 
                            @focus="initMask" 
                            @keyup="savePhone" 
                            @blur="validate" 
                            type="text" 
                            placeholder="Телефон"
                            id="input-phone"
                        />
                        <p v-if="errors.phone">Пожалуста, укажите телефон</p>
                        <input 
                            v-model="client.address"  
                            @blur="validate" 
                            type="text" 
                            placeholder="Адрес"
                            id="input-address"
                        />
                        <p v-if="errors.address">Пожалуста, укажите Ваш адрес</p>
                    </form>
                    <Button 
                        @click="submitForm" 
                        :wide="true" :disabled="disabled" 
                        :loading="sendingOrder"
                        :class="$style['panel-button']"
                    >Отправить</Button>
                </div>
                <!-- Order created -->
                <transition v-else name="slide" appear>
                    <div :class="$style['success']">
                        <img src="@/assets/images/ok.png" alt="ok">
                        <p>Заявка успешно отправлена</p>
                        <span>Вскоре наш менеджер свяжется с Вами</span>
                    </div>
                </transition>
                
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import inputMask from '@/static/js/input-mask.js'

    export default {
        data() {
            return {
                client: {
                    name: '',
                    phone: '',
                    address: ''
                },
                errors: {
                    name: false,
                    phone: false,
                    address: false
                },
                orderCreated: false,
                sendingOrder: false
            }
        },
        computed: {
            ...mapState(['isPanelOpen', 'cart']),
            ...mapGetters(['cartCount']),
            disabled() {
                return !this.client.name || !this.client.phone || !this.client.address || this.errors.phone
            }
        },
        methods: {
            ...mapActions(['togglePanel', 'sendOrder', 'toggleBuying']),
            updateCart(product) {
                this.toggleBuying(product)
                localStorage.setItem('cart', JSON.stringify(this.cart));
            },
            closePanel() {
                if (this.orderCreated) {
                    this.orderCreated = false
                }
                this.togglePanel(false)
            },
            initMask(e) {
                inputMask(e.target)
            },
            savePhone(e) {
                this.client.phone = e.target.value
            },
            validate(e) {
                switch (e.target.getAttribute('id')) {
                    case 'input-name':
                        this.errors.name = !this.client.name
                        break;
                    case 'input-phone':
                        //inputMask allow only digits, so if last char is digit - input contains required number of digits
                        const pattern = /^[0-9]$/;
                        const lastChar = e.target.value[e.target.value.length - 1]
                        this.errors.phone = !pattern.test(lastChar)
                        break;
                    case 'input-address':
                        this.errors.address = !this.client.address
                        break;
                    default:
                        break;
                }
            },
            submitForm() {
                this.sendingOrder = true
                let order = {
                    client: Object.assign({}, this.client),
                    products: [...this.cart],
                }
                this.sendOrder(order)
                    .then(() => {
                        this.orderCreated = true;
                        localStorage.setItem('cart', null);
                        console.log(order);
                        this.sendingOrder = false
                    })
            }
        },
    }
</script>

<style lang="scss" module>
.panel {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 460px;
    min-width: 320px;
    padding: 52px 48px;
    box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px 0px 0px 8px;
    background-color: var(--white);
    // overflow-y: scroll;
    overflow-x: hidden;
    z-index: 200000;
    & .panel-header {
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    & .empty p{
        font-weight: normal;
        font-size: 18px;
        line-height: 28px;
        color: var(--black);
    }
    & .not-empty  {
        & p {
            margin-bottom: 16px;
            font-weight: normal;
            font-size: 18px;
            line-height: 23px;
            color: var(--grey);
        }
        & .cart-products {
            margin-bottom: 32px;
            & > * {
                &:not(:last-child) {
                    margin-bottom: 12px;
                }
            }
        }
        & .form {
            display: flex;
            flex-direction: column;
            & input {
                line-height: 22px;
                padding: 14px;
                background-color: var(--grey-extra-light);
                border: none;
                border-radius: 8px;
                outline: none;
                transition: .3s;
                &:focus {
                    box-shadow: 0 0 0px 1px var(--grey-light);
                }                
                &:not(:first-child) {
                    margin-top: 16px;
                }
            }
            & p {
                    font-size: 12px;
                    color: #f00;
                    font-style: italic;
                    margin-bottom: 0;
                }
        }
    }
    & .success {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        text-align: center;
        & img {
            width: 80px;
            height: auto;
            margin-bottom: 24px;
        }
        & p {
            font-size: 24px;
            line-height: 32px;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 2px;
        }
        & span {
            font-size: 16px;
            line-height: 22px;
            color: var(--grey);
        }
    }
    & .panel-button {
        margin-top: 24px;
    }
}
.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: var(--white);
    opacity: 0.8;   
    cursor: pointer;
}
@media (max-width: 576px) {
    .overlay {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
    }
    .panel {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 30px;
        z-index: 2;
        width: 100%;
        padding: 32px 20px;
        border-radius: 8px 8px 0px 0px;
        & .panel-button {
            margin-top: 24px;
            margin-bottom: 30px;
        }
        & .success p{
            font-size: 20px;
        }
    }
}
@media (max-width: 375px) {
    .panel {
        padding: 20px 12px;
    }
}
</style>