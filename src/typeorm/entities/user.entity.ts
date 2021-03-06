//#region Imports

import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserGameEntity } from './user-game.entity';
import { Type } from 'class-transformer';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { FavoriteEntity } from './favorite.entity';
import { ChatEntity } from './chat.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os usuários
 */
@Entity('user')
export class UserEntity extends BaseEntity {

  //#region Constructors

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  //#region Properties

  /**
   * O e-mail do usuário
   */
  @Column({ nullable: false, unique: true })
  public email: string;

  /**
   * O nome do usuário
   */
  @Column({ nullable: false })
  public name: string;

  /**
   * A senha do usuário
   */
  @Column({ nullable: false })
  public password: string;

  /**
   * O cpf do usuário
   */
  @Column({ nullable: false })
  public cpf: string;

  /**
   * A descrição atual do usuário
   */
  @Column({ nullable: true })
  public description?: string;

  /**
   * Diz se o usuário já confirmou o email
   */
  @Column({ nullable: false, default: false })
  public isEmailConfirmed: boolean;

  /**
   * As permissões desse usuário
   */
  @Column({ nullable: false })
  public roles: string;

  /**
   * O codigo da verificação de 2 etapas para o usuário logar
   */
  @Column({ nullable: true })
  public code?: string;

  /**
   * Joins
   */
  @ApiModelProperty({ type: type => UserGameEntity, isArray: true })
  @OneToMany(u => UserGameEntity, userGame => userGame.user)
  @Type(() => UserGameEntity)
  public userGames: UserGameEntity[];

  @ApiModelProperty({ type: type => PostEntity, isArray: true })
  @OneToMany(u => PostEntity, post => post.user)
  @Type(() => PostEntity)
  public posts: PostEntity[];

  @ApiModelProperty({ type: type => CommentEntity, isArray: true })
  @OneToMany(u => CommentEntity, comment => comment.user)
  @Type(() => CommentEntity)
  public comments: CommentEntity[];

  @ApiModelProperty({ type: type => FavoriteEntity, isArray: true })
  @OneToMany(u => FavoriteEntity, favorite => favorite.user)
  @Type(() => FavoriteEntity)
  public favorites: FavoriteEntity[];

  @ApiModelProperty({ type: type => ChatEntity, isArray: true })
  @OneToMany(u => ChatEntity, sent => sent.messageSent)
  @Type(() => ChatEntity)
  public messagesSent: ChatEntity[];

  @ApiModelProperty({ type: type => ChatEntity, isArray: true })
  @OneToMany(u => ChatEntity, received => received.messageReceived)
  @Type(() => ChatEntity)
  public messagesReceived: ChatEntity[];

  //#endregion

}
