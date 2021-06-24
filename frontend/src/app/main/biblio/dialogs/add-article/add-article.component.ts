import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from "./../../article.entity";
@Component({
    selector     : 'biblio-add-article',
    templateUrl  : './add-article.component.html',
    styleUrls    : ['./add-article.component.scss'],
    encapsulation: ViewEncapsulation.None
}) 
export class BiblioAddArticleComponent
{

    action: string;
    article: Article;
    articleForm: FormGroup;
    // selectedType: string = "";
    dialogTitle: string;
    types = ["General", "Stage"];
    
    /**
     * Constructor
     *
     * @param {MatDialogRef<BiblioAddArticleComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<BiblioAddArticleComponent>,
        // @Inject(MAT_DIALOG_DATA) public _data: any,
        private _formBuilder: FormBuilder,
    )
    {
        this.article = new Article()
        this.articleForm = this.createArticleForm();
    }
   

    // constructor(
    //     public matDialogRef: MatDialogRef<InfosFormDialogComponent>,
    //     // @Inject(MAT_DIALOG_DATA) private _data: any,
    //     private _formBuilder: FormBuilder
    // ) {
        
    //         this.dialogTitle = "Ajouter une Info";
    //         this.info = new Info();
    //         this.infoForm = this.createInfoForm();
    //     }

       
    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    createArticleForm(): FormGroup {
        return this._formBuilder.group({
            title: [this.article.title || ""],
            content: [this.article.content || ""],
        });
    }
onSubmit(){
    
    
}
    /**
     * onSelectChange
     */
    public onSelectChange(type: string) {
        
        // this.selectedType = type;
    }
}
