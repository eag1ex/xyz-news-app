import { Pipe, PipeTransform } from '@angular/core'
import moment from 'moment'

const valid = (val) => {
  return !isNaN(new Date(val).valueOf()) && val > 0
}

@Pipe({
    name: 'myDate',
})
export class MyDatePipe implements PipeTransform {
    transform(num: number): string{
      if (!num) return moment().fromNow()
      if (valid(Number(num))){
        return  moment.unix(new Date(Number(num)).getTime()).fromNow()
      } else return moment().fromNow()
    }
}
