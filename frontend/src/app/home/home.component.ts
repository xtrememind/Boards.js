import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  @ViewChild('formLog')
  formLog: any;

  @ViewChild('formSign')
  formSign: any;


  email: string;
  password: string;
  userName:string;

  ngOnInit() {
    this.email = "";
    this.password = "";
    this.userName="";
  }

  onSubmitLogIn() {
    console.log('submit');
  }

  onSubmitSignUp() {
    if(this.formSign.valid){
      let user={name:this.formSign.value.uname,
                password:this.formSign.value.psw,email:this.formSign.value.uemail};

      console.log(user);
      this.userService.ResigterUser(user).subscribe(
        data =>  console.error(data),
        err => console.error(err),
        () => console.log('registration is done'));
    }
  }
  onCancleLogIn() {
    this.formLog.reset();
  }
  onCancleSignUp() {
    this.formSign.reset();
  }


}
