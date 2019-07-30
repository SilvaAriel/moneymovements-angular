import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenaccountComponent } from './openaccount/openaccount.component';
import { AccountlistComponent } from './accountlist/accountlist.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo:'account'},
  {path:'account', component: AccountComponent},
  {path:'openaccount', component: OpenaccountComponent},
  {path:'accountlist', component: AccountlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
