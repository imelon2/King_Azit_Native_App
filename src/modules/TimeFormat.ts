// new Date() -> HH.MM
export const TimeFormat = (data: any) => {
  if(data == "" || data == undefined || data == null) return "";
  const d = new Date(data);
  const hours = d.getHours();
  const mun = d.getMinutes();
  const time = `${hours}:${mun < 10 ? '0'+mun : mun }`
  return time;
};

// new Date() -> HH.MM AM/PM
export const TimeAMPMFromat = (data: any) => {
  console.log(data);
  
  if(data == "" || data == undefined || data == null) return "";
  let hours = data.getHours();
  let minutes = data.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

// new Date() -> YY-MM-DD
export const DateFromat = (data: any) => {
  if(data == "" || data == undefined || data == null) return "";
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  const d = new Date(data);

  const date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
  return date;
};


// HH.MM -> HH.MM AM/PM
export function convert12H(a:any) {
	var time = a;  // 'hh:mm' 형태로 값이 들어온다
	var getTime = time.substring(0, 2);  // 시간(hh)부분만 저장 
	var intTime = parseInt(getTime);  // int형으로 변환

	if (intTime < 12 ) {  // intTime이 12보다 작으면
		var str = 'AM ';  // '오전' 출력
	} else {  // 12보다 크면
		var str = 'PM ';  // '오후 출력'
	}
	
    // intTime이 12면 변환 후 그대로 12
	if (intTime == 12) {var cvHour = intTime;}
	// 나머지경우엔 intTime을 12로 나눈 나머지값이 변환 후 시간이 된다
	else {var cvHour = intTime%12;}
	
	// 'hh:mm'형태로 만들기
	var res = ('0' + cvHour).slice(-2) + time.slice(-3) + " " + str;  
	// return
	return res;
}
