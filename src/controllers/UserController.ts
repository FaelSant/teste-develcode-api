import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../models/User"
import cloudinary from "cloudinary"
const UserController = {
  async create(request: any, response: Response) {
    cloudinary.v2.config({
      api_secret: process.env.CLOUDINARY_API_SECRET,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    })
    try {
      let uploadedImage = await cloudinary.v2.uploader.upload(request.file.path)
      let UserRepository = getRepository(User)
      const { name, age } = request.body
      let createdUser = UserRepository.create({
        name: name,
        age: age,
        photo_url: uploadedImage.secure_url,
        cloudinary_id: uploadedImage.public_id
      })
      UserRepository.save(createdUser)
      return response.status(201).json(createdUser)
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Houve um erro ao criar o usuário" })
    }
  },
  async list(request: Request, response: Response) {
    try {
      let UserRepository = getRepository(User)
      const selectAll = await UserRepository.find()

      return response.status(201).json(selectAll)
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Houve um erro ao listar os usuários" })
    }
  },
  async remove(request: Request, response: Response) {
    try {
      cloudinary.v2.config({
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME
      })
      const { id } = request.params
      let UserRepository = getRepository(User)
      const found = await UserRepository.find({ where: { id: id } })
      await cloudinary.v2.uploader.destroy(found[0].cloudinary_id)
      const removedUser = await UserRepository.delete(found[0].id)
      return response.status(201).json(removedUser)
    } catch (error) {
      console.log(error)
      return response
        .status(500)
        .json({ message: "Houve um erro ao remover esse usuário" })
    }
  },
  async update(request: any, response: Response) {
    try {
      let UserRepository = getRepository(User)
      cloudinary.v2.config({
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME
      })
      const { id } = request.params
      const { name, age, cloudinary_id, photo_url } = request.body
      let uploadedImage = photo_url
      let uploadedCloudiary_id = cloudinary_id
      if (request.file) {
        await cloudinary.v2.uploader.destroy(cloudinary_id)
        const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
          request.file.path
        )
        uploadedImage = secure_url
        uploadedCloudiary_id = public_id
      }
      const editedUser = await UserRepository.update(id, {
        age: age,
        name: name,
        photo_url: uploadedImage,
        cloudinary_id: uploadedCloudiary_id
      })
      return response.status(201).json(editedUser)
    } catch (error) {
      console.log("Error:", error)
      return response
        .status(500)
        .json({ message: "Houve um erro ao atualizar esse usuário" })
    }
  }
}
export { UserController }
