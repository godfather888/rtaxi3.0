import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CurrentConfigService } from './cms/current-config.service';
import { ThemeService } from './@services/theme.service';

@Component({
  standalone: false,
  selector: 'app-root',
  template: '<router-outlet *ngIf="isLoaded"></router-outlet>',
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  isCollapsed = false;
  isLoaded = false;

  constructor(
    public translate: TranslateService,
    private currentConfigService: CurrentConfigService,
    private router: Router,
    private themeService: ThemeService,
  ) {
    translate.use(localStorage.getItem('lang') ?? 'en');
  }

  ngOnInit(): void {
    this.themeService.updateTheme();
    this.loadConfiguration();
  }

  async loadConfiguration() {
    const currentConfig = await this.currentConfigService.getConfig();
    if (currentConfig.currentConfiguration.purchaseCode == null) {
      this.router.navigateByUrl('config');
      this.isLoaded = true;
      return;
    }
    if (currentConfig.currentConfiguration.adminPanelAPIKey != null) {
      await this.loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${currentConfig.currentConfiguration.adminPanelAPIKey}&libraries=drawing,places&loading=async`,
      );
      this.isLoaded = true;
    } else if (
      currentConfig.currentConfiguration.firebaseProjectPrivateKey == null
    ) {
      this.router.navigateByUrl('config');
      this.isLoaded = true;
    }
  }

  loadScript(name: string) {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = name;
      script.onload = () => {
        resolve();
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
