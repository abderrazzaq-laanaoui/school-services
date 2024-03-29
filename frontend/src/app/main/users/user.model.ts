import { FuseUtils } from '@fuse/utils';

export class User
{
    id: string;
    nom: string;
    prenom: string;
    avatar: string;
    cin: string;
    cne?: string;
    type: string;
    email: string;
    tel: string;
    password?: string;
    birthday: string;
    adresse: string;

    /**
     * Constructor
     *
     * @param user
     */
    constructor(user)
    {
        {
            this.id = user.id || FuseUtils.generateGUID();
            this.nom = user.nom || '';
            this.prenom = user.prenom || '';
            this.avatar = user.avatar || 'assets/images/avatars/profile.jpg';
            this.cin = user.cin || '';
            this.email = user.email || '';
            this.type = user.type || '';
            this.password = user.password || '';
            this.tel = user.tel || '';
            this.adresse = user.adresse || '';
            this.birthday = user.birthday || '';
        }
    } 
}
