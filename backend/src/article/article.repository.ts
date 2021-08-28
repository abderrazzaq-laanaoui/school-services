import { AnneeScolaire } from "src/annee-scolaire/annee-scolaire.entity";
import { Semestre } from "src/semestre/semestre.entity";
import { EntityRepository, Repository } from "typeorm";
import { Article } from "./article.entity";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article>{

}