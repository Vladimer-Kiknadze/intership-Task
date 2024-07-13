import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString',
  standalone: true,
})
export class TruncateStringPipe implements PipeTransform {
  transform(value: string, spaces: number): string {
    if (!value) return value;

    const words = value.split(' ');

    if (words.length <= spaces) return value;

    let truncated = '';
    for (let i = 0; i < spaces; i++) {
      truncated += words[i] + ' ';
    }

    return truncated.trim();
  }
}
