
export function dayMonthYear(dateToIso: string){
    const date = new Date(dateToIso);

    return `${date.getDate()}/${(date.getMonth()+1) < 10 ? 0+""+(date.getMonth()+1) : (date.getMonth()+1)}/${date.getFullYear()}`;
}