import { ForbiddenException, Injectable } from '@nestjs/common';
import { Admin, Etudiant, Professeur } from '../user/user.entity';
import { ArticleRepository } from './article.repository';
import { AddArticleDto } from './dto/add-article.dto';

@Injectable()
export class ArticleService {
  constructor(private _articleRepository: ArticleRepository){}

  async getArticles(user: Admin | Etudiant | Professeur) {
    if( user instanceof Etudiant) return await user.classe.articles;
    return await this._articleRepository.find();
  }

  async addArticle(addArticleDto: AddArticleDto, user: Professeur){
    if(!(user instanceof Professeur))
      throw new ForbiddenException("Vous avez pas les droits de faire cette opération");

  }
}
