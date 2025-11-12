import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pathRoute } from '../../app.routes';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
  standalone: true,
})
export class Homepage {

  username = signal('Developer');

  pathRoute = pathRoute;

}
