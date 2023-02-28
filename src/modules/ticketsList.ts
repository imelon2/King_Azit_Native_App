import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

export type ticketsListType = {
    key:number,
    type:string,
    image:any,
    count:number
}
const ticketsList = () => {
  const {red, black, gold} = useSelector((state: RootState) => state.ticket);
  const Cards = [
    {
      type: 'red',
      image: require('../assets/RedCard.png'),
      count: red,
    },
    {
      type: 'black',
      image: require('../assets/BlackCard.png'),
      count: black,
    },
    {
      type: 'gold',
      image: require('../assets/KingsDaoCard.png'),
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
