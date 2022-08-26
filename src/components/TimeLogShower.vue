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
                console.log(i);
                console.log(Object.keys(dayObject).length == 0);

                if (!Object.keys(dayObject).length){
                    console.log(`empty ${i}`);
                    dayObject["date"] = this.getDate(fullDate);
                    dayObject["id"] = log.id;
                    dayObject[log.tipo] = this.getHours(fullDate);
                    lastType = log.tipo;
                    if (i == this.timeLogs.length - 1) {dayArray.push(dayObject);}
                } else if(log.tipo != lastType && this.getDate(fullDate) == dayObject["date"]){
                    dayObject[log.tipo] = this.getHours(fullDate);
                    dayArray.push(dayObject);
                    dayObject = {};
                    lastType = '';
                    } else {
                        dayArray.push(dayObject);
                        dayObject = {};
                        dayObject["date"] = this.getDate(fullDate);
                        dayObject[log.tipo] = this.getHours(fullDate);
                        lastType = log.tipo;
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
    <div class="bg-white w-4/5">
        <div v-for="dayLog in filteredLogs" :key="dayLog.id" class="flex justify-around">
            <div class="w-28">{{dayLog.date}}</div>
            <div class="w-28">{{dayLog.entrada}}</div>
            <div class="w-28">{{dayLog.saida}}</div>
        </div>
    </div>
</template>

<style lang="">
    
</style>


<!-- "id": log.id,
                    "fullDate": log.timeLog,
                    "data": getDate(log.timeLog),
                    "hour": getHours(log.timeLog),
                     -->