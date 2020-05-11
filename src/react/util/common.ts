export const getDateTimeLocalString = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth().toString().length === 1 ? '0' + (date.getMonth() + 1).toString() : date.getMonth() + 1;
    const day = date.getDate().toString().length === 1 ? '0' + (date.getDate()).toString() : date.getDate();
    const hours = date.getHours().toString().length === 1 ? '0' + date.getHours().toString() : date.getHours();
    const minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes();
    const seconds = date.getSeconds().toString().length === 1 ? '0' + date.getSeconds().toString() : date.getSeconds();

    return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
};

export const getDateTimeString = (date: Date): string => {
    const weekday = getDateDay(date.getDay());
    const monthday = date.getDate();
    const month = getDateMonth(date.getMonth());
    const year = date.getFullYear();
    return `${weekday}, ${month} ${monthday}, ${year}`;
};
const getDateDay = (day: number): string => {
    switch (day) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return '???';
    }
};
const getDateMonth = (day: number): string => {
    switch (day) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
        default:
            return '???';
    }
};