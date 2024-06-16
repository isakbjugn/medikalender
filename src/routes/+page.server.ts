import type { PageServerLoad} from './$types';
import { HOLIDAYS_BASE_URI } from '$lib/constants';
import type { Holiday, HolidayResponse } from '$lib/types';

export const load: PageServerLoad = async () => {
	const currentYear = new Date().getFullYear();

	const holidaysLastYear = await fetchHolidays(currentYear - 1);
	const holidaysThisYear = await fetchHolidays(currentYear);
	const holidaysNextYear = await fetchHolidays(currentYear + 1);

	return {
		holidays: [...holidaysLastYear, ...holidaysThisYear, ...holidaysNextYear ]
	}
};

const fetchHolidays = async (year: number): Promise<Holiday[]> => {
	const res = await fetch(`${HOLIDAYS_BASE_URI}${year}`);
	if (res.ok) {
		const responseJson = await res.json() as HolidayResponse;
		return responseJson.data;
	}
	return [];
}