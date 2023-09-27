export const getFormatDate = (_date?:any) => {
    let date;
    if(_date == null) {
        date = new Date();
    } else {
        date = _date;
    }
    let year = date.getFullYear();              //yyyy
    let month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    let day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;     //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}
export const WEEK = new Array('일', '월', '화', '수', '목', '금', '토');

export const MONTH = new Array("January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
);

