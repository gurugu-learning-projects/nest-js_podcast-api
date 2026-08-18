export class CreateEpisodeDto {
  name: string;
  featured?: boolean;
}

export class UpdateEpisodeDto {
  name?: string;
  featured?: boolean;
}
