import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { ArticleService } from './article.service';
import { AddArticleDto } from './dto/add-article.dto';


@Controller('article')
@UseGuards(AuthGuard())
export class ArticleController {

  constructor(private _articleService: ArticleService){}

  @Get()
  getArticles(@GetUser() user: Admin | Etudiant | Professeur ){
    return this._articleService.getArticles(user)
  }
  @Post()
  addArticle(addArticleDto: AddArticleDto,@GetUser() user: Admin  ){
    return null;
    //  this._articleService.addArticle(addArticleDto,user)
  }
}
