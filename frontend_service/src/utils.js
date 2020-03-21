export const dataTypes = {
    ACTIVE_WINDOWS: 'ACTIVE_WINDOWS',
    RESOURCE_USAGES: 'RESOURCE_USAGES',
    USERNAME: 'USERNAME'
};

export function formatTime(unformattedMinutes){
    const hours = Math.floor((unformattedMinutes / 60));
    const minutes = Math.floor(unformattedMinutes % 60);

    return hours + ':' + (minutes >= 10 ? minutes : '0'+minutes);
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

export const getFullDate = (dateObj = new Date()) => {
    const _format = (...values) => values.map(value => value > 9 ? value : '0' + value);

    const year = dateObj.getFullYear();
    const [
        month,
        day
    ] = _format(
        dateObj.getMonth() + 1,
        dateObj.getDate()
    );

    return `${year}-${month}-${day}`;
};