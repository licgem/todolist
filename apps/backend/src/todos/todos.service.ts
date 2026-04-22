import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Todo } from '@vb/shared';
import type { CreateTodoDto } from './create-todo.dto';
import type { UpdateTodoDto } from './update-todo.dto';

@Injectable()
export class TodosService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('supabase.url')!,
      this.configService.get<string>('supabase.secretKey')!,
    );
  }

  async findAll(userId: string): Promise<Todo[]> {
    const { data, error } = await this.supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new InternalServerErrorException(error.message);
    return data as Todo[];
  }

  async create(userId: string, dto: CreateTodoDto): Promise<Todo> {
    const { data, error } = await this.supabase
      .from('todos')
      .insert({ user_id: userId, title: dto.title })
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data as Todo;
  }

  async update(id: string, userId: string, dto: UpdateTodoDto): Promise<Todo> {
    const { data, error } = await this.supabase
      .from('todos')
      .update(dto)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    if (!data) throw new NotFoundException('Todo not found');
    return data as Todo;
  }

  async remove(id: string, userId: string): Promise<void> {
    const { error, count } = await this.supabase
      .from('todos')
      .delete({ count: 'exact' })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw new InternalServerErrorException(error.message);
    if (count === 0) throw new NotFoundException('Todo not found');
  }
}
