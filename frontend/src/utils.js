export const dataTypes = {
    ACTIVE_WINDOWS: 'active-windows',
    RESOURCE_USAGES: 'resource-usages'
};

export function formatTime(unformattedMinutes){
    const hours = Math.floor((unformattedMinutes / 60));
    const minutes = Math.floor(unformattedMinutes % 60);

    return hours + ':' + (minutes >= 10 ? minutes : '0'+minutes);
}

export function unformatTime(formattedTime) {
    const split = formattedTime.split(':');

    const hours = parseInt(split[0]) * 60;
    const minutes = parseInt(split[1]);

    return hours + minutes;
}

export function formatUsageData(data) {
    const formattedUsageData = {
        cpu: [],
        mem: []
    };

    data.forEach(resourcesUsage => {
        formattedUsageData.cpu.push({x: resourcesUsage[0], y: resourcesUsage[1]});
        formattedUsageData.mem.push({x: resourcesUsage[0], y: resourcesUsage[2]});
    });

    return formattedUsageData;
}

export function formatRequestParams(date, {from, to}) {
    const rawFrom = `${date} ${formatTime(from)}:00`;
    const rawTo = `${date} ${formatTime(to)}:00`;

    const formattedFrom = rawFrom.replace(' ', '%20').replace(':', '%3A');
    const formattedTo = rawTo.replace(' ', '%20').replace(':', '%3A');

    return {formattedFrom, formattedTo};
}