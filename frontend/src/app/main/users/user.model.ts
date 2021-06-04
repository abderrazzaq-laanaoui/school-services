import { FuseUtils } from '@fuse/utils';

export class User
{
    id: string;
    nom: string;
    prenom: string;
    avatar: string;
    cin: string;
    type: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;

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
            this.address = user.address || '';
            this.birthday = user.birthday || '';
        }
    }
}
