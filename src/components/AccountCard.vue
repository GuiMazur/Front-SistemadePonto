<template lang="">
    <router-link to="/login" v-if='!$store.state.user' class="w-24 md:w-40 bg-blue-500 rounded h-12 py-3">Entrar</router-link>
    <div v-else class="w-28 md:w-40">
        <p class="text-xl">{{ $store.state.user.name }}</p>
        <button @click="logout">Logout</button>
    </div>
</template>
<script>
export default {
    methods: {
        logout(){
            this.$store.commit('saveUser', '');
            localStorage.setItem('user', '');
        }
    },
}
</script>
<style lang="">
    
</style>