import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from './profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent implements OnInit
{
    user:any;
    /**
     * Constructor
     */
    constructor(
        private _profileSerive: ProfileService,
        private toastr: ToastrService
        ){}

    ngOnInit(): void {
        this.user = this._profileSerive.user;
    }

    editPassword(){}
    onAvatarSelected(event){
        const file = event.target.files[0];
        if(!['jpg', 'jpeg', 'png'].includes(file.name.split(".")[file.name.split(".").length -1].toLowerCase())){
            this.toastr.error("seulment les formates suivants sont acceptées : 'png/jpg/jpeg'","ERREUR");
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this._profileSerive.updateAvatar( this.user.id,reader.result)
            .then(this.user = this._profileSerive.user);
        };        
    }
    
}
