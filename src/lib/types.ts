export interface Holiday {
	date: Date,
	description: string,
}

export interface HolidayResponse {
	authenticated: boolean,
	timeTaken: number,
	data: Holiday[],
	statusCode: number,
}