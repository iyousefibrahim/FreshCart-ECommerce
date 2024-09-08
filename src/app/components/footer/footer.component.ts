import { Component, inject } from '@angular/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly  _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  change(lang: string) {
    this._MyTranslateService.changeLang(lang);
  }
}
