import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserAuthenticationPlatform }           from "./enums/auth.enum.platform";
import { BaseEntity }                 from "../../../database/base/typeorm/base.entity";
import { UserEntity }                 from "../../../../domain/user/infrastructure/entities/user.entity";



@Entity({ name: 'auth' })
export class AuthEntity extends BaseEntity {
  /**
   * Constructor Function
   */
  constructor(authEntity: any) {
    super();
    Object.assign(this, authEntity)
  }

  /**
   * Table Columns
   */
  @Column({
    type  : 'varchar',
    length: 100,
    unique: true,
    nullable: false,
    comment: "인증 서버 유저 아이디"
  })
  uid: string;

  @Column({
    type: 'enum',
    enum: UserAuthenticationPlatform,
    default: UserAuthenticationPlatform.FIREBASE,
    comment: "인증 플랫폼 이름"
  })
  platform: UserAuthenticationPlatform;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    comment: "엑세스 토콘 리프레시용 토큰"
  })
  current_refresh_token: string;


  /**
   * Table Relations
   */
  @OneToOne(
    () => UserEntity,
    (user) => user.auth
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
