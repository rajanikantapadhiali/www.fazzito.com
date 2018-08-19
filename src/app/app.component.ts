import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd,  } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showLoadingIndicator = false;
  userArray = [{firstname: "Rajkumar",password: "rajkumar"}];
  cart: boolean = false;
  userName: string;
  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    })
  }

  showLogin(): void {
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
    this.userArray.push(signupForm.value);
    document.getElementById('signupModal').style.marginRight = "-500px";
  }

  compareData(loginForm: NgForm) {
    for (let i = 0; i < this.userArray.length; i++) {
      if (this.userArray[i].password == loginForm.value.password && this.userArray[i].firstname == loginForm.value.username) {
       this.cart = true;
       this.userName = this.userArray[i].firstname;
        document.getElementById('loginModal').style.marginLeft = "-500px";
      }
      else {
        alert("Sorry..invalid User Name or Password..");
      }
    }
  }

  myAccount():void {
    document.getElementById('myAccount').style.display = "block";
  }

  logout():void {
    this.cart = false;
    document.getElementById('myAccount').style.display = "none";
    this.router.navigate(['/home']);
  }
  
}
