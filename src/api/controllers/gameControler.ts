import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from 'socket-controllers';
import { Server, Socket } from 'socket.io';

@SocketController()
export class GameController {
  private getSocketGameRoom(socket: Socket): string {
    const socketRoom = Array.from(socket.rooms.values()).filter(
      (room) => room !== socket.id
    );
    const gameRoom = socketRoom && socketRoom[0];
    return gameRoom;
  }

  @OnMessage('update_game')
  public async updateGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit('on_game_update', message);
  }
  @OnMessage('game_win')
  public async gameWin(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit('on_game_win', message);
  }
}
