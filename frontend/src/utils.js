export function formatTime(unformattedMinutes){
    const hours = Math.floor((unformattedMinutes / 60));
    const minutes = unformattedMinutes - (hours * 60);

    return hours + ':' + (minutes >= 10 ? minutes : '0'+minutes);
}

export function getChartLabels({from, to}){

}