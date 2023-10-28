let current_time = document.querySelector('#current-time')
console.log();
current_time.innerHTML= new Date().getHours()+':'+new Date().getMinutes()
function getTime(){
    let time =  new Date()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    setTimeout(() => {
        if(minutes<10){
            minutes = '0'+minutes
        }
        current_time.innerHTML= hours+':'+minutes
        getTime()
    }, 1000);
}

getTime()