import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';
import { User } from 'src/app/IMS.Models/User/User';
import { Role } from 'src/app/IMS.Models/User/Role';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { UsersResponse } from 'src/app/IMS.Models/User/UsersResponse';
import { UserValidators as userValidators } from '../../../../IMS.Services/admin/UserValidator';

@Component({
  selector: 'app-user-manage-form',
  templateUrl: './user-manage-form.component.html',
  styleUrls: ['./user-manage-form.component.css']
})
export class UserManageFormComponent implements OnInit{
  createUserForm : FormGroup
  roles : Role[];
  remark = ""
  updateButtonText : string = "Update";
  submitButtonText : string = "Submit";
  constructor(private formBuilder: FormBuilder, private userManageService: UserManagementService,
    private centralizedDataRepo: CentralizedDataService, private userValidators: userValidators){

      this.createUserForm = this.formBuilder.group({
        id : [ -1,[]],
        role : ["",[Validators.required]],
        firstname : ["", [Validators.required, Validators.maxLength(16),userValidators.cannotContainSpace]],
        lastname : ["",[userValidators.cannotContainSpace, Validators.maxLength(16)]],
        username : ["",[Validators.required, Validators.minLength(6), Validators.maxLength(15),
          userValidators.cannotContainSpace],this.userValidators.userNameTakenValidator.bind(this.userValidators)],
        password : ["", [Validators.minLength(8),Validators.maxLength(16),userValidators.cannotContainSpace,
          this.userValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
          userValidators.patternValidator(/\d/, {hasNumber: true}),
          userValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
          userValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters: true}),
        ]],
        email : ["", [Validators.required, Validators.email], this.userValidators.emailTakenValidator.bind(this.userValidators)],
        isDefaultPasswordChanged: [false]
    })
  }

  @Input() userDetails : User;
  @Output() userEditted : EventEmitter<UsersResponse> = new EventEmitter<UsersResponse>();
  @Output() userCreated : EventEmitter<UsersResponse> = new EventEmitter<UsersResponse>();
  isEditUserForm : boolean;
  isSuperAdmin : boolean;
  
  async ngOnInit(){
    if (this.roles==null || this.roles==undefined)
       this.setUserRoles();
    if(this.centralizedDataRepo.getUser().role.id==4)
      this.isSuperAdmin = true;
    if(this.userDetails){
      this.isEditUserForm = this.userDetails?true: false;

    }
    
    
    if(this.isEditUserForm){
      let userDetail = this.userDetails;
      userDetail.password = "Dummy Password";
      this.createUserForm.setValue(userDetail);
      this.createUserForm.get("username").disable();
      this.createUserForm.get("password").disable();
      this.createUserForm.get("email").clearAsyncValidators();
      this.createUserForm.get("email").valueChanges.subscribe(
        (email : string)=>{
          if(email==this.userDetails.email){
            this.createUserForm.get("email").clearAsyncValidators();
          }
          else{
            this.createUserForm.get("email").setAsyncValidators(
              this.userValidators.emailTakenValidator.bind(this.userValidators)
            )
          }
        }
      );
    }
    if(!this.isSuperAdmin && this.isEditUserForm){
      this.createUserForm.get("role").disable();
    }
   
  }
  
  async setUserRoles(){
    let roles : Role[] = await this.userManageService.getAllRolesFromService();
    this.roles = roles;
  }
  
  async editUserDetails(){
    let user: User = <User>this.createUserForm.getRawValue();
    let edittedUser: UsersResponse = <UsersResponse> await this.userManageService.editUser(user,this.remark);
    this.userEditted.emit(edittedUser);
  }

  async createNewUser(){
    let user: User = <User>this.createUserForm.getRawValue();
    let createdUser: UsersResponse = <UsersResponse>await this.userManageService.createUser(user);
    this.userCreated.emit(createdUser);
  }

  get username(){
    return this.createUserForm.get('username');
  }

  get id(){
    return this.createUserForm.get('id');
  }

  get role(){
    return this.createUserForm.get('role');
  }

  get email(){
    return this.createUserForm.get('email');
  }

  get firstname(){
    return this.createUserForm.get('firstname');
  }

  get lastname(){
    return this.createUserForm.get('lastname');
  }

  get password(){
    return this.createUserForm.get('password');
  }

  submitForm(){
    //create user or update existing user based on editUserForm variable
    if(this.isEditUserForm){
      this.editUserDetails();
    }
    else{
      this.createNewUser();
    }
    this.submitButtonText = this.updateButtonText = "";
  }

  cancelUpdate(){
    this.userEditted.emit(null);
  }

  cancelCreate(){
    this.userCreated.emit(null);
  }


}
