import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { FrontpadService } from './frontpad.service';

@Controller('frontpad')
export class FrontpadController {
  constructor(private frontpadService: FrontpadService) {}

  @Post()
  createOrder(@Body() orderDto) {
    // return this.frontpadService.sendOrder(orderDto);
  }

  @Post('/status')
  @HttpCode(200)
  postStatusOrder(
    @Body()
    body: {
      action: string;
      order_id: string;
      status: string;
      datetime: string;
    },
  ) {
    console.log(body);
    // return this.frontpadService.changeStatus(body);
  }
}
