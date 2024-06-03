import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'permission',
})
export class PermissionPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? '在職中' : '已離職';
  }
}
