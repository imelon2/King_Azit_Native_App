import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

export type ticketsListType = {
    key:number,
    type:string,
    image:any,
    count:number
}
export const RedCardImg = require('../assets/RedCard.png')
export const BlackCardImg = require('../assets/BlackCard.png')
export const GoldCardImg = require('../assets/KingsDaoCard.png')

const ticketsList = () => {
  const {red, black, gold} = useSelector((state: RootState) => state.ticket);
  const Cards = [
    {
      type: 'red',
      image: RedCardImg,
      count: red,
    },
    {
      type: 'black',
      image: BlackCardImg,
      count: black,
    },
    {
      type: 'gold',
      image: GoldCardImg,
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
