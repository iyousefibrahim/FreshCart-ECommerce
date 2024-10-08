import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
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
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { loggedinGuard } from './core/guards/loggedin.guard';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddressComponent } from './components/address/address.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';



export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent, canActivate: [loggedinGuard],
        children: [
            { path: "", redirectTo: "signin", pathMatch: "full" },
            { path: "signin", component: SigninComponent, title: "SignIn" },
            { path: "signup", component: SignupComponent, title: "SignUp" },
            { path: "forgotpassword", component: ForgotpasswordComponent, title: "Forgot Password" }
        ]
    },
    {
        path: "", component: MainLayoutComponent, canActivate: [authGuard],
        children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent, title: "Home" },
            { path: "products", component: ProductsComponent, title: "Products" },
            { path: "categories", component: CategoriesComponent, title: "Categories" },
            { path: "brands", component: BrandsComponent, title: "Brands" },
            { path: "cart", component: CartComponent, title: "Cart" },
            { path: "wishlist", component: WishlistComponent, title: "WishList" },
            { path: "productdetails/:id", component: ProductDetailsComponent, title: "Details" },
            { path: "address/:id", component: AddressComponent, title: "Address" },
            { path: "categorydetails/:id", component: CategoryDetailsComponent, title: "Category Details" },
            { path: "branddetails/:id", component: BrandDetailsComponent, title: "Brand Details" },


        ]
    },
    { path: "**", component: NotFoundComponent, title: "NotFound 404!" }

];
