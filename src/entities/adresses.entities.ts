import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Address{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 45 })
    street: string

    @Column({ type: "varchar", length: 8 })
    zipCode: string

    @Column({ type: "varchar", length: 7, default: null })
    number?: string | undefined | null

    @Column({ type: "varchar", length: 20 })
    city: string

    @Column({ type: "varchar", length: 2 })
    state: string
}