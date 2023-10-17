import { TicketType } from "@/config";

export const ConvertTicketTypeENtoKR = (type:TicketType) => {
    switch (type) {
        case 'black':
            return '블랙'
        case 'red':
            return '레드'
        case 'gold':
            return '골드'
        default:
            return ""
    }
}

export const UpperString = (data?: string) => {
    if (!data) return;
    return data.charAt(0).toUpperCase() + data.slice(1);
  };
  