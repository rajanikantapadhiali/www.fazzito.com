import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppService } from './app.service';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLoadingIndicator = false;
  private allUsers: any = [];
  cart: boolean = false;
  user_name: string;
  show: boolean = false;
  constructor(private router: Router, private _appservice: AppService, private _storageService: StorageService) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    })
  }

  ngOnInit() {
    this._appservice.todo.subscribe(data => {
      this.showLogin();
    })
    if (this._storageService.getSessionStorage('current_user')) {
      let user: any = this._storageService.getSessionStorage('current_user');
      this.cart = true;
      this.user_name = user.firstname;
    }
    this.allUsers = this._storageService.getLocalStorage('all_users');
  }

  public showLogin(): void {
    document.getElementById('signupModal').style.marginRight = "-500px";
    document.getElementById('loginModal').style.marginLeft = "950px";
  }

  hideLogin(): void {
    document.getElementById('loginModal').style.marginLeft = "-500px";
  }

  showSignup(): void {
    document.getElementById('loginModal').style.marginLeft = "-500px";
    document.getElementById('signupModal').style.marginRight = "950px";
  }

  hideSignup(): void {
    document.getElementById('signupModal').style.marginRight = "-500px";
  }

  insertData(signupForm: NgForm): void {
    const user = this.allUsers.find(item => {
      return item.phone == signupForm.value.phone;
    });

    if (!user) {
      this.allUsers.push(signupForm.value);
      this._storageService.setLocaStorage('all_users', this.allUsers);
      this.allUsers = this._storageService.getLocalStorage('all_users');
    } else {
      alert("User is already exists!");
    }
    document.getElementById('signupModal').style.marginRight = "-500px";
  }

  compareData(loginForm: NgForm) {
    const user = this.allUsers.find(item => {
      return item.phone == loginForm.value.phone;
    });

    if (user) {
      if (user.password == loginForm.value.password && user.phone == loginForm.value.phone) {
        this.cart = true;
        this.user_name = user.firstname;
        this._storageService.setSessionStorage('current_user', user);
        document.getElementById('loginModal').style.marginLeft = "-500px";
      }
      else {
        alert("Sorry..invalid User Name or Password..");
      }
    } else {
      alert("User does not exists, please signup!");
    }
  }

  myAccount(): void {
    if(!this.show){
      this.show = true;
      document.getElementById('myAccount').style.display = "none";
      return;
    }

    if(this.show){
      this.show = false;
      document.getElementById('myAccount').style.display = "block";
      return;
    }
    
   
  }

  logout(): void {
    this._storageService.setSessionStorage('current_user', null);
    this.cart = false;
    document.getElementById('myAccount').style.display = "none";
    this.router.navigate(['/home']);
  }

}
