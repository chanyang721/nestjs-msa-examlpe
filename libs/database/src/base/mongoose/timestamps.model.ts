import { Prop } from "@nestjs/mongoose";



export class Timestamps {
  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({ type: Date, default: Date.now })
  deleted_at: Date;
}
