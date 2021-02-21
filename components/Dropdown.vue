<template>
    <div :class="$style['dropdown-container']" v-outside-click="closeMenu">
        <div :class="$style['dropdown-control']">
            <span>Сортировать по:</span>
            <span 
                :class="`${$style['dropdown-button']} ${showMenu ? $style.open : ''}`"
                @click="showMenu = !showMenu"
            >{{selectedOption.name}}</span>
        </div>
        <transition name="slide-fade">
            <div  v-if="showMenu" :class="$style['dropdown-menu']">
                <ul>
                    <li 
                        v-for="(option, index) in options" 
                        @click="setSelected(option)"
                        :key="index"
                    >{{`По ${option.name}`}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import outsideClick from '@/directives/outside-click'

export default {
    directives: {
        outsideClick: outsideClick
    },
    mounted() {
        this.selectedOption = this.options[0]
    },
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showMenu: false,
            selectedOption: ''
        }
    },
    methods: {
        setSelected(option) {
            this.selectedOption = option
            this.$emit('change', option)
            this.closeMenu()
        },
        closeMenu() {
            this.showMenu = false
        }
    },
}
</script>

<style lang="scss" module>
.dropdown-container {
    position: relative;
    & .dropdown-control {
        text-align: right;
    }
}
.dropdown-menu {
    position: absolute;
    top: 28px;
    left: 0;
    right: 0;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background-color: var(--white);
    z-index: 2;
    & ul {
        padding: 8px 0;
        list-style-type: none;
        & li {
            display: flex;
            align-items: center;
            height: 26px;
            padding: 0 12px;
            cursor: pointer;
            font-size: 14px;
            line-height: 18px;
            color: var(--grey-light);
            &:hover {
                background-color: var(--grey-extra-light);
                color: var(--black);
            }
        }
    }
}
.dropdown-button {
    color: var(--grey);
    position: relative;
    padding-right: 10px;
    cursor: pointer;
    &::after {
        position: absolute;
        right: 0;
        top: 10px;
        display: inline-block;
        content: '';
        height: 0;
        width: 0;
        vertical-align: center;
        border-top: 2.5px solid var(--grey);
        border-right: 2.5px solid transparent;
        border-left: 2.5px solid transparent;
        transition: .3s;
    }
    &.open::after {
        transform:  rotateZ(-180deg);
    }   
}
@media (max-width: 375px) {
    .dropdown-container {
        max-width: 200px;
        font-size: 14px;
    }
}
</style>