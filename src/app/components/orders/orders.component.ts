import { Component, inject } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Order, User } from '../../core/interfaces/order';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  private readonly _OrderService = inject(OrderService);
  private readonly _AuthService = inject(AuthService);
  isLoading : boolean = true;
  userData = JSON.parse(localStorage.getItem('userData')!);
  userOrders: Order[] = {} as Order[];
  uniqueUsers:any;

  extractUniqueUsers(): void {
    const userMap = new Map<string, User>();

    // this.userOrders.forEach(order => {
    //   const userKey = `${order.user.email}`;
    //   if (!userMap.has(userKey)) {
    //     userMap.set(userKey, order.user);
    //   }
    // });

    this.uniqueUsers = Array.from(userMap.values());
  }

  getOrders() {
    this._OrderService.getUserOrders(this.userData.id).subscribe({
      next: (res) => {
        this.isLoading = false
        this.userOrders = res;
        this.extractUniqueUsers();
        console.log(res);
      }
    })
  }

  ngOnInit(): void {
    this.getOrders();
  }
}


