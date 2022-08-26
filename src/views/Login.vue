<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      email: '',
      senha: '',
      erro: false
    }
  },
  methods: {
    async auth(){
      this.erro=false;
      try{
        let response = await axios.post('http://localhost:8000/api/login', {"email":this.email, "password":this.senha})
        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
            this.$store.commit('saveUser', response.data);
            router.push('/');            
        } else{
            this.erro=true
        }
      }catch(e){console.log(e); this.erro=true};
    }
  },
  mounted() {
    if (this.$store.state.user != ''){
      router.push('/')
    } else if(localStorage.getItem('user') != '') {
      this.$store.commit('saveUser', JSON.parse(localStorage.getItem('user')));
      router.push('/')
    }
  },
}

</script>

<template>
  <form @submit.prevent='auth' class="bg-blue-100 h-screen border pt-36">
    <div class="w-9/12 bg-white m-auto border border-black py-12">
      <div class="md:w-1/2 bg-white flex flex-col m-auto w-full">
        <h2 class="text-gray-900 text-2xl mb-1 font-semibold title-font">Login</h2>
        <p class="leading-relaxed mb-5 text-gray-600">Insira suas credenciais para se conectar à Plataforma.</p>
        <div class="mb-4">
          <label for="email" class="block leading-7 text-sm text-gray-600">Email</label>
          <input v-model="email" type="email" id="email" name="email" class="w-4/5 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="mb-4">
          <label for="senha" class="block leading-7 text-sm text-gray-600">Senha</label>
          <input v-model="senha" type="password" id="senha" name="senha" class="w-4/5 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          <p v-if='erro' class="text-red-600">Email ou senha incorretos</p>
        </div>
        <button class="w-3/5 md:w-full m-auto mt-10 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:text-black hover:bg-blue-200 border-2 border-indigo-500 border-box rounded text-lg">Entrar</button>
        <p class="text-xs text-gray-500 mt-3">Não tem uma conta? <a class='text-blue-600' href="/#/register">Cadastre-se</a></p>
      </div>
    </div>
  </form>
</template>

