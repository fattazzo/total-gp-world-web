import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform {

    transform(value) {
        if (!value) return;

        if (typeof value === "string") {
            return value.split("").reverse().join("");
        }


        return value.reverse();
    }
}