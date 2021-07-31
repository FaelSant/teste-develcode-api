import { getRepository } from "typeorm"

import { User } from "../entity/User"

export const UserRepository = getRepository(User)
