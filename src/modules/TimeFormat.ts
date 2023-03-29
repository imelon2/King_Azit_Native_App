const TimeFormat = (data: string) => {
if(data === "") return "";
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  const d = new Date(data);

  const date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return date + ' ' + time;
};

export default TimeFormat;
