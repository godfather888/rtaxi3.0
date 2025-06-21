import { BrowserModule, Title } from '@angular/platform-browser';
import { inject, LOCALE_ID, NgModule } from '@angular/core';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './@components/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createClient } from 'graphql-ws';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import {
  ar_EG,
  de_DE,
  en_US,
  es_ES,
  fr_FR,
  hy_AM,
  ja_JP,
  ko_KR,
  NZ_DATE_LOCALE,
  NZ_I18N,
  pt_PT,
  ro_RO,
  ru_RU,
  zh_CN,
} from 'ng-zorro-antd/i18n';
import { TimeagoModule } from 'ngx-timeago';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  UserOutline,
  ContainerOutline,
  CustomerServiceOutline,
  GlobalOutline,
  BulbOutline,
  NotificationOutline,
  BankOutline,
  CarOutline,
  FundOutline,
  ControlOutline,
  PlusOutline,
  DashboardOutline,
  MenuFoldOutline,
  LogoutOutline,
  MenuUnfoldOutline,
  ArrowLeftOutline,
  DeleteOutline,
  PictureTwoTone,
  ExportOutline,
  InboxOutline,
  DownloadOutline,
  LockOutline,
  EyeInvisibleOutline,
  FieldTimeOutline,
  ScheduleOutline,
  FolderOpenOutline,
  AlertOutline,
  MoreOutline,
  DollarOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  enUS,
  es,
  fr,
  de,
  ar,
  hy,
  ko,
  ru,
  zhCN,
  ja,
  pt,
  ro,
} from 'date-fns/locale';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloLink, DefaultOptions, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

const icons: IconDefinition[] = [
  UserOutline,
  ContainerOutline,
  CustomerServiceOutline,
  GlobalOutline,
  BulbOutline,
  NotificationOutline,
  BankOutline,
  CarOutline,
  FundOutline,
  ControlOutline,
  PlusOutline,
  DashboardOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  LogoutOutline,
  ArrowLeftOutline,
  DeleteOutline,
  PictureTwoTone,
  ExportOutline,
  InboxOutline,
  DownloadOutline,
  LockOutline,
  MoreOutline,
  EyeInvisibleOutline,
  FieldTimeOutline,
  ScheduleOutline,
  FolderOpenOutline,
  DollarOutline,
  AlertOutline,
];
registerLocaleData(en);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NzIconModule.forRoot(icons),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    TimeagoModule.forRoot(),
  ],
  providers: [
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const http = httpLink.create({
        uri: `${environment.root}graphql`,
      });
      const wsLink = new GraphQLWsLink(
        createClient({
          url: environment.wsEndpoint,
          connectionParams: () => ({
            authToken: localStorage.getItem('ridy_admin_token'),
          }),
        }),
      );
      const basic = setContext(() => ({
        headers: {
          Accept: 'charset=utf-8',
        },
      }));
      const auth = setContext(() => {
        return {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ridy_admin_token')}`,
          },
        };
      });
      const defaultOptions: DefaultOptions = {
        watchQuery: {
          fetchPolicy: 'no-cache',
          //errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          //errorPolicy: 'all',
        },
      };
      const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      });

      const link = ApolloLink.from([basic, auth, errorLink, http]);
      const splitLink = split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        link,
      );

      return {
        cache: new InMemoryCache({
          addTypename: false,
        }),
        link: splitLink,

        defaultOptions,
      };
    }),
    {
      provide: NZ_DATE_LOCALE,
      useFactory: () => {
        const lang = localStorage.getItem('lang') ?? 'en';
        switch (lang) {
          case 'en':
            return enUS;

          case 'es':
            return es;

          case 'fr':
            return fr;

          case 'de':
            return de;

          case 'ar':
            return ar;

          case 'hy':
            return hy;

          case 'ko':
            return ko;

          case 'ru':
            return ru;

          case 'zh':
            return zhCN;

          case 'ja':
            return ja;

          case 'pt':
            return pt;

          case 'ro':
            return ro;

          default:
            return enUS;
        }
      },
    },
    {
      provide: NZ_I18N,
      //useValue: en_US,
      useFactory: (localId: string) => {
        const lang = localStorage.getItem('lang') ?? 'en';
        switch (lang) {
          case 'en':
            return en_US;

          case 'es':
            return es_ES;

          case 'fr':
            return fr_FR;

          case 'de':
            return de_DE;

          case 'ar':
            return ar_EG;

          case 'hy':
            return hy_AM;

          case 'ko':
            return ko_KR;

          case 'ru':
            return ru_RU;

          case 'zh':
            return zh_CN;

          case 'ja':
            return ja_JP;

          case 'pt':
            return pt_PT;

          case 'ro':
            return ro_RO;

          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private title: Title,
    private translator: TranslateService,
  ) {
    translator.get('branding.page.title').subscribe((x) => {
      title.setTitle(x);
    });
  }
}
