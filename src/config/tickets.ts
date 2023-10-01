export type TicketType = 'black' | 'red' | 'gold' | "";
export type TicketTypeKR = '블랙티켓' | '레드티켓' | '골드티켓';

export type TicketImgType = "basic" | "width";
export const Ticket_Img = {
    basic:{
      RedCardImg : require('../assets/RedTicket.png'),
      BlackCardImg : require('../assets/BlackTicket.png'),
      GoldCardImg : require('../assets/GoldTicket.png')
    },
    width:{
      RedCardImg : require('../assets/RedCard_Width.png'),
      BlackCardImg : require('../assets/BlackCard_Width.png'),
      GoldCardImg : require('../assets/GoldCard_Width.png')
     }
  }