import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 45 })
    name: string

    @Column({ unique: true, type: "varchar", length: 45 })
    email: string

    @Column({ type: "boolean", default: false })
    admin: boolean

    @Column({ type: "varchar", length: 120 })
    password: string

    @CreateDateColumn()
    createdAt: Date | string

    @UpdateDateColumn()
    updatedAt: Date | string

    @DeleteDateColumn()
    deletedAt: Date | string
}