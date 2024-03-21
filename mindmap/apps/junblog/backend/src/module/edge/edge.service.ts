import * as Edge from './edge.model';
import { Id, LoadService } from '@nogql/util-server';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EdgeService extends LoadService<Edge.Mdl, Edge.Doc> {
  constructor(
    @InjectModel(Edge.name)
    private readonly Edge: Edge.Mdl
  ) {
    super(EdgeService.name, Edge);
  }

  async getEdges(userId: Id): Promise<any[]> {
    const result = await this.Edge.findOne({ user: userId });
    return result?.edges || [];
  }

  async updateEdges(userId: Id, edges: any[]): Promise<void> {
    if (!edges) throw new Error('empty edges');
    await this.Edge.updateOne({ user: userId }, { edges }, { upsert: true });
  }
}
