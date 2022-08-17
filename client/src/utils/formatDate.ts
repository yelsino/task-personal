import * as moment from 'moment';
moment.locale('es');

export const formatDate = (date: Date | string, format: string): string => {
    let dt = moment(date, "YYYY-MM-DD")
    return moment(dt).format(format)
}