
const is_same_day = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth();
}

export  const get_holiday_description = (date: Date, holidays: any[]) => {
  if (holidays.length === 0) {
    return ""
  }
  for (const holiday of holidays) {
    const holiday_date = new Date(holiday.date);
    if (is_same_day(holiday_date, date)) {
      return holiday.description;
    }
  }
  switch (date.getDay()) {
    case 0: return "Søndag";
    case 6: return "Lørdag";
    default: return "Ukedag";
  }
};

export const find_next_day = (doses: number, doses_daily: number, start_day: Date): Date => {
  const treatment_days = doses / doses_daily;
  const begin_date = new Date(start_day);
  return new Date(begin_date.setDate(begin_date.getDate() + treatment_days));
}

export const get_first_day_of_last_year = (): Date => {
  const today = new Date();
  return new Date(today.getFullYear() - 1, 0, 1);
}

export const get_last_day_of_next_year = (): Date => {
  const today = new Date();
  return new Date(today.getFullYear() + 1, 11, 31);
}