import { Component, computed, inject, OnInit } from '@angular/core';
import { ErrorModalService } from '../../services/error-modal-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  imports: [CommonModule],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.scss',
})
export class ErrorModal {
  private modalService = inject(ErrorModalService);

  // Computed per sapere se mostrare la modale
  showModal = computed(() => this.modalService.message() !== null);
  message = computed(() => this.modalService.message());

  close() {
    this.modalService.close();
  }
}
