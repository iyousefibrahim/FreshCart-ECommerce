import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {

  private readonly  _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }

}
