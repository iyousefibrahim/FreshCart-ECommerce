import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input-msg',
  standalone: true,
  imports: [],
  templateUrl: './form-input-msg.component.html',
  styleUrl: './form-input-msg.component.scss'
})
export class FormInputMsgComponent {
  @Input({required:true}) Form!:FormGroup;
  @Input({required:true}) FormControl!:any;
}
