<template>
    <nav class="flex absolute w-full items-center justify-between bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded border">
        <img @click="goHome" src="https://static.wixstatic.com/media/64e983_a77c4587046c42f2beb79cf2b6ac9ceb~mv2.png/v1/fill/w_167,h_58,al_c,lg_1,q_85,enc_auto/logo_wiki.png" 
        class="w-28 md:w-40 hover:cursor-pointer"  alt="">
        <div @click="goHome" class="hover:cursor-pointer w-20 md:w-40"><h1 class="text-xl md:text-3xl font-bold color-green rounded">Sistema de Ponto</h1></div>
        <AccountCard class="w-28 md:w-40"/>
    </nav>
</template>

<script>
import AccountCard from './AccountCard.vue'
import router from '@/router';

export default {
  name: 'NavBar',
  components: {
    AccountCard
  },
  methods: {
    goHome(){router.push('/')}
  },
}
</script>