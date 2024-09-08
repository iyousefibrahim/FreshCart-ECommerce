import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss'
})
export class NavMainComponent {

  readonly _AuthService = inject(AuthService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }
}
