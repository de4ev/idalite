<template>
        <button 
            @click="handleClick"
            :class="classes"
            type="button"
        >
            <Loader v-if="loading"/>
            <slot v-else></slot>
        </button>
</template>

<script>
    export default {
        props: {
            wide: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            classes() {
                let classes = [this.$style.btn]
                if (this.wide) {
                    classes.push(this.$style.wide)
                }
                if (this.small) {
                    classes.push(this.$style.small)
                }
                if (this.disabled) {
                    classes.push(this.$style.disabled)
                }
                return classes.join(' ')
            }
        },
        methods: {
            handleClick() {
                if (!this.disabled) {
                    this.$emit('click')
                }
            }
        }
    }
</script>

<style lang="scss" module>

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    max-height: 50px;
    padding: 14px;
    background-color: var(--black);
    border-style: none;
    border-radius: 8px;
    outline: none;
    font-family: inherit;
    font-size: 16px;
    font-weight: 400;
    color: var(--white);
    line-height: 22px;
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    transition: .3s;
    &:hover {
        background-color: var(--grey);
    }
    &:active {
        transform: scale(0.98);
        background-color: #404349;
    }
    &.small {
        background-color: var(--white);
        width: 32px;
        height: 32px;
        min-width: 32px;
        padding: 0;
        transition: .3s;
        & img {
            transition: .3s;
        }
        &:hover {
            transform: scale(1.01);
            & img {
                filter: brightness(0.1)
            }
        }
        &:active {
            transform: scale(0.96);
        }
    }
    &.wide {
        width: 100%;
    }

    &.disabled {
        background-color: var(--grey-light);
        &:hover {
            cursor: not-allowed;
        }
        &:active {
            transform: none;
        }
    }
}
</style>