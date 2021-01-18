import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { CommentDto } from './comment.dto'
import { TournamentsService } from './tournaments.service'

@Controller()
export class TournamentsController {
  constructor(
    private readonly service: TournamentsService
  ) {}

  @Get('api/tournaments')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  async many() {
    const list = await this.service.getTournaments()

    return {
      list,
    }
  }

  @Get('api/tournaments/:id')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  one(@Param('id') id: string) {
    return this.service.getTournament(id)
  }

  @Get('api/tournaments/:id/comments')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  getComments(@Param('id') id: string) {
    return this.service.getComments(id)
  }

  @Post('api/tournaments/:id/comments')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  createComment(@Body() body: CommentDto, @Req() req: Request) {
    return this.service.createComment(body, req.user)
  }

  @Delete('api/tournaments/:id/comments/:commentId')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  deleteComment(@Param('commentId') commentId: string) {
    return this.service.deleteComment(commentId)
  }
}
