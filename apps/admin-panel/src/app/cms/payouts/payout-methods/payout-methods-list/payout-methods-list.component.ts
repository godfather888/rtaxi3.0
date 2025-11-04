import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { PayoutMethodsQuery } from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { environment } from '../../../../../environments/environment';
import { Observable, map } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-payout-methods-list',
  templateUrl: './payout-methods-list.component.html',
  styleUrls: ['./payout-methods-list.component.css'],
})
export class PayoutMethodsListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<PayoutMethodsQuery>>;
  serverUrl = environment.root;
  // Базовый URL для изображений (без /admin-api/)
  imageBaseUrl = `${window.location.protocol}//${window.location.hostname.toString()}/`;

  constructor(
    private route: ActivatedRoute,
    public tableService: TableService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.payoutMethods));
  }

  getImageUrl(address?: string): string {
    console.log('🖼️ getImageUrl called:', { address, serverUrl: this.serverUrl, imageBaseUrl: this.imageBaseUrl });
    
    if (!address) {
      console.log('🖼️ No address, returning fallback');
      return '/assets/logo.png';
    }
    
    // Если это уже полный URL, возвращаем как есть
    if (address.startsWith('http')) {
      console.log('🖼️ Full URL detected:', address);
      return address;
    }
    
    // Для изображений используем serverUrl (с /admin-api/)
    if (address.startsWith('/')) {
      const cleanAddress = address.replace(/^\/+/, '');
      const result = this.serverUrl + cleanAddress;
      console.log('🖼️ Path with slash:', { address, cleanAddress, result });
      return result;
    }
    
    // Иначе просто добавляем serverUrl
    const result = this.serverUrl + address;
    console.log('🖼️ Regular path:', { address, result });
    return result;
  }
}
