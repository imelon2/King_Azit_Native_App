function comma(str:any) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str:any) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

/**
 * 
 * @param obj number
 * @returns 천단위 콤마(,) 형식
 * @example obj : 1000000 returns : 1,000,000
 */
export function inputNumberFormat(obj:any) {
    return comma(uncomma(obj));
}