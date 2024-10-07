import { http, HttpResponse } from 'msw'

const COMPANIES_PATH = `${import.meta.env.VITE_APP_API_URL}/companies` as const

export const CompaniesHandlers = [
    http.get(`${COMPANIES_PATH}`, async () => {
        return HttpResponse.json([
            {
                id: '45efb6d9-81f1-4260-8e4f-6f832348e1bd',
                companyName: 'Altenwerth LLC',
                details: 'Networked motivating throughput',
            },
            {
                id: 'a11608fb-0096-4a17-8915-9b8e26656431',
                companyName: 'Kuhn - Cummerata',
                details: 'Team-oriented user-facing adapter',
            },
            {
                id: '091abf2a-7098-4e31-8e74-45dfc1e5f58c',
                companyName: 'Welch - Price',
                details: 'Inverse composite toolset',
            },
            {
                id: 'a76c66fa-6fc8-422e-97b4-1c900227648f',
                companyName: 'Brown - Sporer',
                details: 'Diverse systemic emulation',
            },
            {
                id: '7550c27b-0b22-4a7a-9622-3db04293ec6b',
                companyName: 'Bernier - Purdy',
                details: 'Multi-channelled uniform framework',
            },
            {
                id: 'ffbd0d15-a66d-4ec0-a638-a6f738c996ac',
                companyName: 'Barrows, Deckow and Glover',
                details: 'Universal non-volatile concept',
            },
            {
                id: '9edc0533-edb3-4dc9-aedf-6cb628a8cfb0',
                companyName: 'Orn, Reilly and Schinner',
                details: 'Business-focused local emulation',
            },
        ])
    }),
]
