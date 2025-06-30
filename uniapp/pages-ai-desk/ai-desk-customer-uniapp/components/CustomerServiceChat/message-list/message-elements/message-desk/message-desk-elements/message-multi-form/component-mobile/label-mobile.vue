<template>
    <div class="form-label">
        {{ name }}
        <div v-if="isRequired" style="color: red;">
            &nbsp;*
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        props:{
            name:{
                type:String,
                default:''
            },
            isRequired:{
                type:Number,
                default:0
            }
        },
        setup(props){
            
        }
    }
</script>
<style lang="scss">
.form-label {
    display:flex;
    width:70px;
    padding-bottom: 8px;
}
</style>