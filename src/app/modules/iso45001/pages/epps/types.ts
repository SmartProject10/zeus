import { z } from 'zod'

import { schema } from './schemas'

export type PersonalProtectiveEquipment = z.infer<typeof schema>
