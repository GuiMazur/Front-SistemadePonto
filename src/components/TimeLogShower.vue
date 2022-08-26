<script>
export default {
    props: {
        timeLogs: Array
    },
    computed: {
        filteredLogs(){
            var dayArray = [];
            var dayObject = {};
            var lastType = '';
            for (let i=0; i < this.timeLogs.length; i++){
                let log = this.timeLogs[i];
                let fullDate = new Date(log.timeLog);

                if (!Object.keys(dayObject).length){
                    console.log(`empty ${i}`);
                    dayObject["date"] = this.getDate(fullDate);
                    dayObject["id"] = log.id;
                    dayObject[log.tipo] = this.getHours(fullDate);
                    lastType = log.tipo;
                    if (i == this.timeLogs.length - 1 || log.tipo=="saida") {dayArray.push(dayObject); dayObject={};}
                    
                } else if(log.tipo == "saida" && this.getDate(fullDate) == dayObject["date"]){
                    dayObject[log.tipo] = this.getHours(fullDate);
                    dayArray.push(dayObject);
                    dayObject = {};
                    lastType = '';
                    } else {
                        dayArray.push(dayObject);
                        dayObject = {};
                        dayObject["date"] = this.getDate(fullDate);
                        dayObject[log.tipo] = this.getHours(fullDate);
                        if (i == this.timeLogs.length - 1) {dayArray.push(dayObject);}
                    }
            }
            return dayArray.reverse();
        }
    },
    
    methods: {
        twoDigits(number){ return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })},
        getDate(fullDate){
            const date = new Date(fullDate);
            return this.twoDigits(date.getDate())+'/'+this.twoDigits(date.getMonth()+1)+'/'+date.getFullYear();
        },
        getHours(fullDate){
            const date = new Date(fullDate);
            return this.twoDigits(date.getHours()) + ":" + this.twoDigits(date.getMinutes()) + ":" + this.twoDigits(date.getSeconds())
        },
    },
}
</script>

<template lang="">
    <div class="bg-white w-4/5 m-auto max-h-[280px] md:max-h-[380px] xl:max-h-[500px] overflow-y-auto rounded border border-black">
        <table class="table-fixed m-auto bg-white w-full md:w-4/5">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Entrada</th>
                    <th>Saída</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dayLog in filteredLogs" :key="dayLog.id" class="">
                    <td class="w-22">{{dayLog.date}}</td>
                    <td class="w-22">{{dayLog.entrada}}</td>
                    <td class="w-22">{{dayLog.saida}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="">
    
</style>

<table class="table-auto bg-white w-4/5 m-auto">
  <thead>
    <tr>
      <th>Data</th>
      <th>Entrada</th>
      <th>Saída</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="dayLog in filteredLogs" :key="dayLog.id" class="flex justify-around">
      <td class="w-28">{{dayLog.date}}</td>
      <td class="w-28">{{dayLog.entrada}}</td>
      <td class="w-28">{{dayLog.saida}}</td>
    </tr>
  </tbody>
</table>