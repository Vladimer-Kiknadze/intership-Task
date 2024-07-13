import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { userPosts } from '../../types/userPosts.model';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  @Output() PopupEmitter = new EventEmitter<boolean>();
  @Input() user!: userPosts;

  closePopup() {
    this.PopupEmitter.emit(false);
  }
}
