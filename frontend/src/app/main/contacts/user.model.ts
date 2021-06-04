import { FuseUtils } from '@fuse/utils';

export class User
{
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    nickname: string;
    company: string;
    jobTitle: string;
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
            this.name = user.name || '';
            this.lastName = user.lastName || '';
            this.avatar = user.avatar || 'assets/images/avatars/profile.jpg';
            this.nickname = user.nickname || '';
            this.company = user.company || '';
            this.email = user.email || '';
            this.phone = user.phone || '';
            this.address = user.address || '';
            this.birthday = user.birthday || '';
            this.notes = user.notes || '';
        }
    }
}
