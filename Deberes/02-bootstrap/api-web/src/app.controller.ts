import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/steam')
  steam(
      @Response() res
  ) {
    return res.render(
        'estilos-steam.ejs'
    );
  }

    @Get('/github')
    github(
        @Response() res
    ) {
        return res.render(
            'estilos-github.ejs'
        );
    }
}
