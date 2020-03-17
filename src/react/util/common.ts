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

export const getTimeString = (date: Date): string => {
    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    return `${hours > 12 ? hours - 12 : hours}:${minutes}${minutes < 10 ? '0' : ''} ${hours > 12 ? 'PM' : 'AM'}`;
};