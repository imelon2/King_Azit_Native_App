import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import { TicketImgType, TicketType, Ticket_Img } from '@/config/tickets';

export type ticketsListType = {
    key?:number,
    type:TicketType,
    image:any,
    count:number
}

const ticketsList = (_type:TicketImgType):ticketsListType[] => {
  const {red, black, gold} = useSelector((state: RootState) => state.ticket);
  const Cards:ticketsListType[] = [
    {
      type: 'black',
      image: Ticket_Img[_type].BlackCardImg,
      count: black,
    },
    {
      type: 'red',
      image: Ticket_Img[_type].RedCardImg,
      count: red,
    },
    {
      type: 'gold',
      image: Ticket_Img[_type].GoldCardImg,
      count: gold,
    },
  ];
  return [...Array(Cards.length).keys()].map((_, i) => {
    return {
      key: i,
      image: Cards[i].image,
      type: Cards[i].type,
      count: Cards[i].count,
    };
  });
};

export const ConvertSummary = (_summary:string) => {
  if(_summary == "qr") return "QR 결제"

  return _summary;
}

export default ticketsList;
