import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  name: string

  @Column()
  age: string

  @Column()
  photo_url: string

  @Column()
  cloudinary_id: string
}
export { User }
