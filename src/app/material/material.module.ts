import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
const materialComponenents=[
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
];

@NgModule({
  imports: [materialComponenents],
  exports: [materialComponenents]
})
export class MaterialModule { }
