import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './product/product.component';
import { SpecialoffersComponent } from './specialoffers/specialoffers.component';
import { BooktableComponent } from './booktable/booktable.component';
import { ContactComponent } from './contact/contact.component';
import { MealplansComponent } from './mealplans/mealplans.component';
import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:_id', component: ProductsComponent },
  { path: 'specialoffers', component: SpecialoffersComponent },
  { path: 'booktable', component: BooktableComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mealplan', component: MealplansComponent },
  { path: 'cart', component: CartComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ProductsComponent,
    SpecialoffersComponent,
    BooktableComponent,
    ContactComponent,
    MealplansComponent,
    CartComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
