import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './enum/boardStatus';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}
  // // 타입 추론이 되기 때문에 타입을 지정하지 않아도 Board[]로 인식
  // getAllBoards() /*: Board[] */ {
  //   return this.boards;
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //
  //   return board;
  // }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id {${id}}`);
    }

    return found;
  }

  // deleteBoard(id: string) {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus) {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
