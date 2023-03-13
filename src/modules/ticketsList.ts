import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

export type ticketsListType = {
    key:number,
    type:string,
    image:any,
    count:number
}
type EventType = "basic" | "width";

const img = {
  basic:{
    RedCardImg : require('../assets/RedCard.png'),
    BlackCardImg : require('../assets/BlackCard.png'),
    GoldCardImg : require('../assets/KingsDaoCard.png')
  },
  width:{
    RedCardImg : require('../assets/RedCard_Width.png'),
    BlackCardImg : require('../assets/BlackCard_Width.png'),
    GoldCardImg : require('../assets/GoldCard_Width.png')
   }
}


const ticketsList = (_type:EventType) => {
  const {red, black, gold} = useSelector((state: RootState) => state.ticket);
  const Cards = [
    {
      type: 'red',
      image: img[_type].RedCardImg,
      count: red,
    },
    {
      type: 'black',
      image: img[_type].BlackCardImg,
      count: black,
    },
    {
      type: 'gold',
      image: img[_type].GoldCardImg,
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

export default ticketsList;
