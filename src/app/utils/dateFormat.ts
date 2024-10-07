
export function dayMonthYear(dateToIso: string) {
    const date = new Date(dateToIso)

    // eslint-disable-next-line max-len
    return `${date.getDate()}/${(date.getMonth() + 1) < 10 ? 0 + '' + (date.getMonth() + 1) : (date.getMonth() + 1)}/${date.getFullYear()}`
}

export function dateInput(dateToIso: string) {
    const date = new Date(dateToIso)

    // eslint-disable-next-line max-len
    return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? 0 + '' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${(date.getDate()) < 10 ? 0 + '' + (date.getDate()) : (date.getDate())}`
}
