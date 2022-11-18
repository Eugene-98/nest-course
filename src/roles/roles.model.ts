import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRole } from "./user-role.model";

interface RoleCreationAttrs {
    value: string;
    discription: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique identificator'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'User role'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'administrator', description: 'Rele discription'})
    @Column({type: DataType.STRING, allowNull: false})
    discription: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];

}