import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pathRoute } from '../../../app.routes';

@Component({
  selector: 'app-not-authenticated',
  imports: [RouterLink],
  templateUrl: './not-authenticated.html',
  styleUrl: './not-authenticated.scss',
})
export class NotAuthenticated {
  pathRoute = pathRoute;
}
