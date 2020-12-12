import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class GuildOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    return request.user?.isOwner ?? false
  }
}
