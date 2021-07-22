import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './auth/jwt-payload.interface';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import { UserRepository } from './user.repository';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async getUser(id: number, user: Etudiant | Admin | Professeur) {
        if (user instanceof Admin) {
            return await this.userRepository.getUser(id);
        } else {
            if (user.id === id) return await this.userRepository.getUser(id);
            else throw new NotFoundException("L'utilisateur demandé n'existe pas!");
        }
    }

    // get avatar
    async getAvatar(id: number, user: Etudiant | Admin | Professeur) {
        if (user instanceof Admin) return await this.userRepository.getAvatar(id);
        if (user.id === id) return await this.userRepository.getAvatar(id);
        throw new ForbiddenException("Vous n'avez pas accès à cette ressource");
    }

    async updateAvatar(id: number, avatar: string, user: Etudiant | Admin | Professeur) {
        if (user instanceof Admin || user.id === id) return await this.userRepository.updateAvatar(id, avatar);
        throw new ForbiddenException('Vous pouvez pas effectuer cette operation!');
    }

    async updateUser(id: number, userData: any, user: Etudiant | Admin | Professeur) {
        if (user instanceof Admin || id === user.id) {
            return await this.userRepository.updateUser(id, userData);
        }
        throw new ForbiddenException('Vous pouvez pas effectuer cette operation!');
    }

    async deleteUser(id: number, user: Etudiant | Admin | Professeur) {
        if (user instanceof Admin) return await this.userRepository.delete(id);
        throw new ForbiddenException('Vous pouvez pas effectuer cette operation!');
    }
    async getUsers(user: Etudiant | Admin | Professeur) {
        if (user instanceof Admin) return await this.userRepository.find();
        // if (user instanceof Professeur) return 'list edtudiant'; //TODO : RETURN LIST OF STUDENTS
        throw new ForbiddenException("Vous avez pas les droit d'access à ce resource");
    }

    async signUpStudent(addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
        return this.userRepository.addStudent(addStudentDto);
    }

    async signUpProfesseur(addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
        return this.userRepository.addProfesseur(addProfesseurDto);
    }

    async signUpAdmin(addAdminDto: AddUserDto): Promise<Partial<Admin>> {
        return this.userRepository.addAdmin(addAdminDto);
    }

    async signIn(authCredntialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        try {
            const payload: JwtPayload = await this.userRepository.validateUserPassword(authCredntialDto);
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        } catch (e) {
            throw new UnauthorizedException('Données non valides!');
        }
    }

    //reset password
    async resetPassword(id: number, user: Etudiant | Admin | Professeur): Promise<any> {
        if(!(user instanceof Admin)) throw new ForbiddenException('Vous n\'avez pas accès à cette ressource');
        let res = await this.userRepository.resetPassword(id);
        if(!res) throw new NotFoundException('Utilisateur non trouvé!');
        // return 204 with update seccuss message
        return "le mot de passe a été changé avec succès!";
    }

    // update password
    async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto, user: Etudiant | Admin | Professeur): Promise<any> {
        if(user instanceof Admin) {
            const {old_password, new_password} = updatePasswordDto;
            let res = await this.userRepository.updatePassword(id, old_password, new_password);
            if(res) return "Votre mot de passe a été changé avec succès!";
            throw new NotFoundException('Utilisateur non trouvé!');
        }
        throw new ForbiddenException('Vous n\'avez pas accès à cette ressource');
    }

}
