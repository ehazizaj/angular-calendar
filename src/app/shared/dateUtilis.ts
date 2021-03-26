import { DatePipe } from '@angular/common';

// converts the date to yyyy-MM-dd format
export const formatDateForSongUpdate = (date: Date | string): string => {
  date = new Date(date);
  return new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
};
