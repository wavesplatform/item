import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        (m) => m.HomePageModule,
      ),
    data: {
      title: 'Item Protocol',
      description: `
        Item protocol enables quick and easy deployment and integration
        of a blockchain-based in-game marketplace`,
      siteName: 'Item Protocol',
      url: 'https://item.sh',
      image: 'https://item.sh/opengraph.png',
    },
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        (m) => m.HomePageModule,
      ),
    // data: {
    //   title: 'Official site of Waves. The WEB 3.0 company',
    //   description: `
    //     Open-source blockchain platform for cutting-edge dApps -
    //     giving you the tools to build your own incredible WEB3 solutions`,
    //   siteName: 'Wavesplatform',
    //   url: 'https://wavesplatform.com',
    //   image: 'https://wavesplatform.com/assets/sharing/waves-sharing-home.png',
    // },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
