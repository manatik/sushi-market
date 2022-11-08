import { Injectable, Logger } from '@nestjs/common';
// import { EntityManager } from 'typeorm';
// import { OrderDto } from '../order-user/dto/order.dto';
// import * as FormData from 'form-data';
// import { OrderStatusModel } from '../order-user/models/order-status.model';
// import { OrderModel } from '../order-user/models/order.model';
// import { AxiosResponse, AxiosError } from 'axios';
// import { HttpService } from '@nestjs/axios';

// В производстве
export const IN_PROGRESS_STATUS = 13;
// Произведен
export const COMPLETED_STATUS = 12;
// В пути
export const IN_WAY_STATUS = 4;
// Удален
export const DELETED_ORDER_STATUS = 14;
// Выполнен
export const FINISHED_ORDER_STATUS = 10;
export const PICK_UP = 1227;

@Injectable()
export class FrontpadService {
  // constructor(
  //   private readonly httpService: HttpService,
  //   private readonly manager: EntityManager,
  // ) {}
  //
  // private PICK_UP = 'cамовывоз';
  // private logger: Logger = new Logger('FRONTPAD');
  //
  // async sendOrder(orderDto: OrderDto, frontpadProducts: any[] = []) {
  //   const tags: string[] = [];
  //   const statuses: number[] = [
  //     DELETED_ORDER_STATUS,
  //     IN_WAY_STATUS,
  //     FINISHED_ORDER_STATUS,
  //     COMPLETED_STATUS,
  //     IN_PROGRESS_STATUS,
  //   ];
  //   const arrayArticles: number[] = [];
  //   const arrayCount: number[] = [];
  //   const arrayPrices: number[] = [];
  //   // 0 - Улица, 1 - Дом, 2 - Квартира, 3 - Подъезд, 4 - Этаж
  //   const arrayAddress: string[] = orderDto.address.split(',');
  //
  //   frontpadProducts.forEach((element) => {
  //     arrayArticles.push(element.article);
  //     arrayPrices.push(element.price);
  //     arrayCount.push(element.count);
  //   });
  //
  //   const formData: any = new FormData();
  //   formData.append('secret', process.env.FRONTPAD_SECRET);
  //   arrayArticles.map((article, index) => {
  //     formData.append(`product[${index}]`, article);
  //   });
  //   arrayCount.map((count, index) => {
  //     formData.append(`product_kol[${index}]`, count);
  //   });
  //   arrayPrices.map((price, index) => {
  //     formData.append(`product_price[${index}]`, price);
  //   });
  //   statuses.map((status, index) => {
  //     formData.append(`hook_status[${index}]`, status);
  //   });
  //
  //   if (orderDto.type === this.PICK_UP) {
  //     tags.push('' + PICK_UP);
  //   } else {
  //     formData.append('street', arrayAddress[0] || '');
  //     formData.append('home', arrayAddress[1] || '');
  //     formData.append('apart', arrayAddress[2] || '');
  //     formData.append('pod', arrayAddress[3] || '');
  //     formData.append('et', arrayAddress[4] || '');
  //   }
  //
  //   tags.map((tag, index) => {
  //     formData.append(`tags[${index}]`, tag);
  //   });
  //
  //   formData.append('name', orderDto.name);
  //   formData.append('phone', orderDto.phone);
  //   formData.append('datetime', orderDto.dateOrder);
  //   formData.append('descr', orderDto.comment);
  //   formData.append('pay', orderDto.payment.code);
  //   formData.append('person', orderDto.countPerson);
  //   formData.append('point', orderDto.pointSale);
  //
  //   return this.httpService.axiosRef
  //     .post(process.env.FRONTPAD_URL + 'new_order', formData, {
  //       headers: {
  //         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  //       },
  //     })
  //     .then(({ data }: AxiosResponse) => {
  //       this.logger.log(formData, data);
  //       return data;
  //     })
  //     .catch(({ response }: AxiosError) => {
  //       this.logger.log(formData, response.data);
  //       return response.data;
  //     });
  // }
  //
  // async changeStatus(body) {
  //   const manager = this.manager;
  //   const status = await manager.findOne(OrderStatusModel, {
  //     where: { code: body.status },
  //   });
  //
  //   if (!status) {
  //     this.logger.error('Не нашел статус заказа от фронтпада');
  //     return;
  //   }
  //
  //   const order = await manager.findOne(OrderModel, {
  //     where: { orderNumber: body.order_id },
  //   });
  //
  //   if (!order) {
  //     this.logger.error('Не нашел номер заказа от фронтпада');
  //     return;
  //   }
  //
  //   order.statusId = status.id;
  //   await manager.save(order);
  //
  //   return;
  // }
}
