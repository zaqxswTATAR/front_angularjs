import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateSequenceComponent } from './components/create-sequence/create-sequence.component'
import { EditSequenceComponent } from './components/edit-sequence/edit-sequence.component';
import { SequenceListComponent } from './components/sequence-list/sequence-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-sequence' },
  { path: 'sequence-list', component: SequenceListComponent },
  { path: 'create-sequence', component: CreateSequenceComponent },
  { path: 'edit-sequence/:id', component: EditSequenceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
