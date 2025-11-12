import { Component, computed } from '@angular/core';
import { isLoading } from '../../states/loading.signal';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  showLoader = computed(() => isLoading());
}
