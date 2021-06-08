import { EntityRepository, Repository } from "typeorm";
import { AddInfoDto } from "./dto/add-info.dto";
import { Info } from "./info.entity";

@EntityRepository(Info)
export class InfoRepository extends Repository<Info>{
  async addInfo(addInfoDto: AddInfoDto) {
    const info = new Info();
    info.title = addInfoDto.title;
    info.content = addInfoDto.content;
    info.type = addInfoDto.type;
    return await info.save();
  }
  
}