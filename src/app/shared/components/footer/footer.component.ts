import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Image {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  bankImages: Image[] = [
    { src: '../../../../assets/images/bank4.png', alt: 'bog' },
    { src: '../../../../assets/images/bank3.png', alt: 'tbc' },
    { src: '../../../../assets/images/bank2.png', alt: 'liberty' },
    { src: '../../../../assets/images/bank1.png', alt: 'visa' },
  ];

  languageImages: Image[] = [
    { src: '../../../../assets/images/geo.png', alt: 'geo' },
    { src: '../../../../assets/images/eng.png', alt: 'eng' },
    { src: '../../../../assets/images/rus.png', alt: 'rus' },
  ];

  messengerImages: Image[] = [
    { src: '../../../../assets/images/viber.png', alt: 'viber' },
    { src: '../../../../assets/images/telegram.png', alt: 'telegram' },
    { src: '../../../../assets/images/messenger.png', alt: 'messenger' },
  ];
}
