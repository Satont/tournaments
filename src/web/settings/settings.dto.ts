import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator'

class Role {
  @IsString()
  id: string

  @IsNumber()
  kda: number;
}

export class SettingsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Role)
  roles: Array<Role>
}
