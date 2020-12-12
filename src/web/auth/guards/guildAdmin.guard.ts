import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class GuildAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    return request.user?.isAdmin ?? false
  }
}
