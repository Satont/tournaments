import { Injectable } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { Settings } from '../../entities/Settings'

@Injectable()
export class SettingsService {
  private readonly repository = getRepository(Settings)

  getSettingsList() {
    return this.repository.find({})
  }
}
