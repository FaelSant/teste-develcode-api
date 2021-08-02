import { getRepository } from "typeorm"

import { User } from "../models/User"

export const UserRepository = getRepository(User)
