import { Pipe, PipeTransform } from '@angular/core'
import {hostName} from '../utils'

@Pipe({
    name: 'hostName',
})
export class HostNamePipe implements PipeTransform {
    transform(str: string): string{
      return hostName(str)
    }
}
