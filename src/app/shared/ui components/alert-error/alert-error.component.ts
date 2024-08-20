import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alert-error',
  standalone: true,
  imports: [],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.scss'
})
export class AlertErrorComponent {
  @Input({required:true}) Form!:FormGroup;
  @Input({required:true}) FormControl!:any;
}
