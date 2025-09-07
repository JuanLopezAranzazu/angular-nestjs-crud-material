import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missing',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './missing.component.html',
  styleUrl: './missing.component.scss',
})
export class MissingComponent {}
