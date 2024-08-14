import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent,
        children: [
            { path: "", redirectTo: "signin", pathMatch: "full" },
            { path: "signin", component: SigninComponent },
            { path: "signup", component: SignupComponent }
        ]
    },
    {
        path: "", component: MainLayoutComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: "products", component: ProductsComponent },
            { path: "categories", component: CategoriesComponent },
            { path: "brands", component: BrandsComponent },
            { path: "cart", component: CartComponent },
            { path: "orders", component: OrdersComponent },
        ]
    },
    { path: "**", component: NotFoundComponent }

];
