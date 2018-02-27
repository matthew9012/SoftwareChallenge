import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'centsToDollars'})
export class CentsToDollars implements PipeTransform {
  transform(cents: number, args: string[]): string {
    return '$' + cents / 100;
  }
}
