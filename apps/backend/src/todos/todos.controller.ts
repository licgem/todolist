import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import type { AuthUser, ApiResponse, Todo } from '@vb/shared';

@Controller('todos')
@UseGuards(SupabaseAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(@CurrentUser() user: AuthUser): Promise<ApiResponse<Todo[]>> {
    const todos = await this.todosService.findAll(user.id);
    return { success: true, data: todos };
  }

  @Post()
  async create(
    @Body() dto: CreateTodoDto,
    @CurrentUser() user: AuthUser,
  ): Promise<ApiResponse<Todo>> {
    const todo = await this.todosService.create(user.id, dto);
    return { success: true, data: todo };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTodoDto,
    @CurrentUser() user: AuthUser,
  ): Promise<ApiResponse<Todo>> {
    const todo = await this.todosService.update(id, user.id, dto);
    return { success: true, data: todo };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<ApiResponse> {
    await this.todosService.remove(id, user.id);
    return { success: true, message: 'Todo deleted' };
  }
}
