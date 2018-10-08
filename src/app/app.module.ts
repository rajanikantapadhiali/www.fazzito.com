import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './product/product.component';
import { SpecialoffersComponent } from './specialoffers/specialoffers.component';
import { BooktableComponent } from './booktable/booktable.component';
import { ContactComponent } from './contact/contact.component';
import { MealplansComponent } from './mealplans/mealplans.component';
import { CartComponent } from './cart/cart.component';
import { ProductResolverService } from './productResolver.service';
import { AppService } from './app.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'menu',
    component: MenuComponent,
    resolve: { ram: ProductResolverService} },
  { path: 'menu/:_id', 
    component: ProductsComponent,
    resolve: { ram: ProductResolverService} },
  { path: 'specialoffers', component: SpecialoffersComponent },
  { path: 'booktable', component: BooktableComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mealplan', component: MealplansComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: PageNotFoundComponent }
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
    CartComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [ProductResolverService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
