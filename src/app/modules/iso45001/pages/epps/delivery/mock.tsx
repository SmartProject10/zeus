import { SelectConfig } from './chained-selects'
import { PersonalProtectiveEquipment } from './types'

export const brands = [
	{ value: 'nike', label: 'Nike' },
	{ value: 'adidas', label: 'Adidas' },
	{ value: 'puma', label: 'Puma' },
]

export const epps = {
	nike: [
		{ value: 'zapato-nike', label: 'Zapato' },
	],
	puma: [
		{ value: 'zapato-puma', label: 'Calcetines' },
		{ value: 'puma-2', label: 'Polo' },
	],
	adidas: [
		{ value: 'adidas', label: 'Zapato' },
		{ value: 'adidas-2', label: 'Pantalon' },
	],
}

export const genders = {
	'zapato-nike': [
		{ value: 'male-1', label: 'Male' },
	],
	pantalon: [
		{ value: 'male-2', label: 'Male' },
		{ value: 'female-1', label: 'Female' },
	],
	'zapato-puma': [
		{ value: 'female-2', label: 'Female' },
	],
	'puma-2': [
		{ value: 'male-3', label: 'Male' },
		{ value: 'female-3', label: 'Female' },
	],
	adidas: [
		{ value: 'male-4', label: 'Male' },
		{ value: 'female-4', label: 'Female' },
		{ value: 'unisex-1', label: 'Unisex' },
	],
	'adidas-2': [
		{ value: 'male-5', label: 'Male' },
	], 
}

export const sizes = {
	'male-1': [
		{ value: 's', label: 'S' },
	],
	'male-2': [
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
	],
	'male-3': [
		{ value: 's', label: 'S' },
		{ value: 'xl', label: 'XL' },
	],
	'male-4': [
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
		{ value: 'l', label: 'L' },
		{ value: 'xl', label: 'XL' },
		{ value: 'xxl', label: 'XXL' },
	],
	'male-5': [
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
		{ value: 'l', label: 'L' },
		{ value: 'xl', label: 'XL' },
		{ value: 'xxl', label: 'XXL' },
	],
	'female-1': [
		{ value: 's', label: 'S' },
	],
	'female-2': [
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
	],
	'female-3': [
		{ value: 's', label: 'S' },
		{ value: 'xl', label: 'XL' },
	],
	'female-4': [
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
		{ value: 'l', label: 'L' },
		{ value: 'xl', label: 'XL' },
		{ value: 'xxl', label: 'XXL' },
	],
	'female-5': [
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
		{ value: 'l', label: 'L' },
		{ value: 'xl', label: 'XL' },
		{ value: 'xxl', label: 'XXL' },
	],
}

export const configs: SelectConfig[] = [
	{
		key: 'brand',
		name: 'Marca',
		placeholder: 'Selecciona una marca',
		options: brands,
	},
	{
		key: 'epps',
		name: 'EPPS',
		placeholder: 'Selecciona un EPPS',
		options (prev: Record<string, string>) {
			return epps[prev.brand as keyof typeof epps] || []
		},
	},
	{
		key: 'gender',
		name: 'Genero',
		placeholder: 'Selecciona un genero',
		options (prev: Record<string, string>) {
			return genders[prev.epps as keyof typeof genders] || []
		},
	},
	{
		key: 'size',
		name: 'Talla/Tipo',
		placeholder: 'Selecciona una talla o un tipo',
		options (prev: Record<string, string>) {
			return sizes[prev.gender as keyof typeof sizes] || []
		},
	},
]

export const typeOfWork = [
	{
		id: 0,
		name: 'Trabajos en espacios confirmados',
	},
	{
		id: 1,
		name: 'Trabajos en altura',
	},
	{
		id: 2,
		name: 'Trabajo en alto riesgo construcción',
	},
	{
		id: 3,
		name: 'Trabajo expuesto a radiación',
	},
	{
		id: 4,
		name: 'Trabajos con energias peligrosas',
	},
	{
		id: 5,
		name: 'Trabajos con sustancias quimicas',
	},
	{
		id: 6,
		name: 'Trabajos con grandes niveles de ruido',
	},
	{
		id: 7,
		name: 'Trabajos en caliente',
	},
	{
		id: 8,
		name: 'Trabajos electricos',
	},
]

export const items: PersonalProtectiveEquipment[] = [
	{
		brand: 'Nike',
		size: 'Talla',
		gender: 'Masculino',
		dateOfEntry: '2022-01-01',
		dateOfExit: '2022-01-01',
		areaOfStorage: 'Sede',
		storageSite: 'Proveedor',
		unitaryCost: '100',

		eppType: 'Tipo',
		epps: '1234567890',
		amount: '100',
		typeOfMoney: 'Tipo',
		workerJob: 'Empleado',
		workerSite: 'Sede',
		typeOfWorker: 'Tipo',
		code: '1234567890',
		provider: 'Proveedor',
		distribution: 'Distribuidor',
		numberOfDotation: '100',
	},
]

export async function getPPS () {
	return items
}
