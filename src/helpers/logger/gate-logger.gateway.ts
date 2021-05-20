import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

/**
 * Gate logger gateway
 */
@WebSocketGateway()
export class GateLoggerGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  /**
   * Web socket server of gate logger gateway
   */
  @WebSocketServer() server: Server;
  /**
   * Logger  of gate logger gateway
   */
  private logger = new Logger('GatewayLogger');

  /**
   * Handles connection
   * @param client
   * @param args
   */
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(
      'Se conecto el usuario ' + client.id + ' ' + JSON.stringify(args),
    );
  }
  /**
   * Handles disconnect
   * @param client
   */
  handleDisconnect(client: any) {
    this.logger.log('Se desconecto el usuario ' + client.id);
  }
  /**
   * After init
   * @param server
   */
  afterInit(server: any) {}

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): Observable<WsResponse<any>> {
  //     return { event: 'testing', data: '' };
  // }
  /**
   * Sends log
   * @param newLog
   */
  sendLog(newLog: string) {
    this.server.emit('private/log', newLog);
  }
}
