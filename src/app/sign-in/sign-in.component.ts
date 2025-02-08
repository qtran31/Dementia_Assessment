import { AfterViewInit, Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements AfterViewInit {

  user:any;
  pass:any;
  cred:any;

  constructor(    private dataService: DataService  ) {}
    ngAfterViewInit(){
      this.startSignIn();
    }
  
  startSignIn(){
    //document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("button");
    btn.addEventListener("click", (e:MouseEvent) => {

      const inputUsername = (document.getElementById("username") as HTMLInputElement).value;
      const inputPassword = (document.getElementById("password") as HTMLInputElement).value;
      console.log("Login of user: ", inputUsername);
      this.verifyLogin(inputUsername, inputPassword, this.dataService);
    });
  //});
  }

  verifyLogin(inputUsername, inputPassword, dataService){  
      dataService.callVerifyCredentials(inputUsername).subscribe((res: any) => {

      this.user = res["username"];
      this.pass = res["password"];
      this.cred = res["cred"];

      if(inputUsername == this.user && inputPassword == this.pass) {

        console.log("Login Successful!");
  
        //Direct user to appropriate page.
        if(this.cred == "user") {
          window.location.assign("#/dementia-test");
        }

        else if(this.cred == "admin") {
          window.location.assign("#/provider-view");
        }
      }
      else {
        console.log("Login failed. Username or password is incorrect.");
      }
  });  
  }
}
