<script>
import router from "@/router";
import axios from "axios";

export default {
  data() {
    return {
        name:'',
        email: '',
        senha: '',
        exitTime: 18,
        admin: false
    }
  },
  methods: {
    async submit(){
        let r = await axios.post('http://localhost:8000/api/register', {"name":this.name,"email":this.email, "password":this.senha, "defaultExitTime":this.exitTime, "admin":this.admin});
        let response = r.data;
        if (response.result) {
            alert(response.message)
            router.push('/login')
        } else{
        alert(response.message.errorInfo[2])
        }
    }
  }
}
</script>

<template lang="">
    <form @submit.prevent='submit' class="bg-blue-100 h-screen border pt-36">
        <div class="w-9/12 bg-white m-auto border border-black py-12">
            <div class="md:w-1/2 bg-white flex flex-col m-auto w-full">
            <h2 class="text-gray-900 text-2xl mb-1 font-semibold title-font">Cadastro</h2>
            <p class="leading-relaxed mb-5 text-gray-600">Insira seus dados para criar uma conta.</p>
            <div class="mb-4">
                <label for="name" class="block leading-7 text-sm text-gray-600">Nome</label>
                <input v-model="name" type="text" id="name" name="name" class="w-4/5 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="mb-4">
                <label for="email" class="block leading-7 text-sm text-gray-600">Email</label>
                <input v-model="email" type="email" id="email" name="email" class="w-4/5 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="mb-4">
                <label for="senha" class="block leading-7 text-sm text-gray-600">Senha</label>
                <input v-model="senha" type="password" id="senha" name="senha" class="w-4/5 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="flex justify-between items-center">
                <div class="flex content-left flex-col">
                    <div class="mb-4 w-32">
                        <label for="exitTime" class="block leading-7 text-sm text-gray-600">Horário de Saída</label>
                        <Select v-model="exitTime" id="exitTime" name="exitTime" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value="12">12h</option>
                            <option value="13">13h</option>
                            <option value="14">14h</option>
                            <option value="15">15h</option>
                            <option value="16">16h</option>
                            <option value="17">17h</option>
                            <option value="18">18h</option>
                            <option value="19">19h</option>
                            <option value="20">20h</option>
                        </Select>
                    </div>
                </div>
                <div class="flex items-center w-32">
                    <input v-model='admin' id="checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2">
                    <label for="checkbox" class="ml-2 text-sm font-medium text-blue-900 ">Administrador</label>
                </div>
            </div>
            <button type='submit' class="w-3/5 md:w-full m-auto mt-10 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:text-black hover:bg-blue-200 border-2 border-indigo-500 border-box rounded text-lg">Cadastrar</button>
            <p class="text-xs text-gray-500 mt-3">Já tem uma conta? <a class='text-blue-600' href="/#/login">Faça Login</a></p>
            </div>
        </div>
    </form>
</template>

<style lang="">
    
</style>