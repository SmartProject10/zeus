import { z } from 'zod'

export const schema = z.object({
	brand: z.string().trim().min(1),
	epps: z.string().trim().min(1),
	gender: z.string().trim().min(1),
	size: z.string().trim().min(1),
	eppType: z.string().trim().min(1),
	dateOfEntry: z.string().trim().min(1),
	dateOfExit: z.string().trim().min(1),
	typeOfEmployee: z.string().trim().min(1),
	employeeSite: z.string().trim().min(1),
	employeeJob: z.string().trim().min(1),
	storageSite: z.string().trim().min(1),
	areaOfStorage: z.string().trim().min(1),
	amount: z.string().trim().min(1),
	typeOfMoney: z.string().trim().min(1),
	unitaryCost: z.string().trim().min(1),
	code: z.string().trim().min(1),
	provider: z.string().trim().min(1),
	distribution: z.string().trim().min(1),
	numberOfDotation: z.string().trim().min(1),
})
