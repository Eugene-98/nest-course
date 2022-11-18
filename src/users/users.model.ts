import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/post.model";
import { Role } from "src/roles/roles.model";
import { UserRole } from "src/roles/user-role.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique identificator'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@email.com', description: 'User email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'qwerty', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Is banned?'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Toxic', description: 'Ban reason'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[]
}