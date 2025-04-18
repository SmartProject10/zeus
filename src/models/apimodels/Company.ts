//Company

export interface Company {
    _id: string;
    email: string;
    phone: string | null;
    password?: string;
    ruc: string | null;
    socialReason: string | null;
    countryId: string | null; // ObjectId referenciando a 'companyCountry'
    province: string | null;
    city: string | null;
    address: string | null;
    economicActivity: string | null;
    economicSector: string | null;
    companySize: 'Micro' | 'Pequeña' | 'Mediana' | 'Grande' | null;
    acquisitionIds: string[]; // Array de ObjectIds referenciando a 'companyAcquisition'
    siteIds: string[];
    areaIds: string[];
    createdAt?: string;
    updatedAt?: string;
}