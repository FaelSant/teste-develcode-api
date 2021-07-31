import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../entity/User"
const UserController = {
  async create(request: Request, response: Response) {
    let UserRepository = getRepository(User)
    const { name, age, photo_url } = request.body
    let createdUser = UserRepository.create({
      name: name,
      age: age,
      photo_url: photo_url
    })
    let savedUser = UserRepository.save(createdUser)
    return response.status(201).json(savedUser)
  },
  async list(request: Request, response: Response) {
    let UserRepository = getRepository(User)
    const selectAll = await UserRepository.find()

    return response.status(201).json(selectAll)
  },
  async remove(request: Request, response: Response) {
    const { id } = request.params
    let UserRepository = getRepository(User)
    const removedUser = await UserRepository.delete(id)

    return response.status(201).json(removedUser)
  },
  async update(request: Request, response: Response) {
    const { id, name, age, photo_url } = request.body
    let UserRepository = getRepository(User)
    const editedUser = await UserRepository.update(id, {
      age: age,
      name: name,
      photo_url: photo_url
    })
    return response.status(201).json(editedUser)
  }
}
export { UserController }
