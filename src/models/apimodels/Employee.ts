//Employee

export interface Employee {
	_id: string;
	name: string | null;
	lastname: string | null;
	email: string;
	password: string | null;
	dni: string;
	mothers_lastname: string;
	fathers_lastname: string;
	birthDate: Date | string;
	companyAreaId: string;
	charge: string;
	entryDate: Date | string;
	contractTerminationDate: Date | string | null;
	areaEntryDate: Date | string;
	province: string;
	city: string;
	address: string;
	district: string;
	corporateEmail: string;
	nationalityId: string;
	gender: 'Masculino' | 'Femenino' | '';
	civilStatus: 'Soltero/a' | 'Casado/a' | 'Divorciado/a' | 'Conviviente' | 'Viudo/a' | '';
	personalPhone: string;
	facialRecognition: string | null;
	digitalSignature: string | null;
	status: 'Activo' | 'Inactivo' | '';
	employeeSiteId: string;
	rolId: string;
	sizePants: 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44;
	sizePolo: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
	sizeShoe: 36 | 38 | 40 | 42 | 44;
	companyIds: string[];
	createdAt?: Date | string;
	updatedAt?: Date | string;
}