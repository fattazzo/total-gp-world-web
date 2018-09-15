import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem'

@Pipe({
    name: 'selectItemPipe'
})
export class SelectItemPipe implements PipeTransform {

    transform(value: any, valueProperty: string, orderByProperty: string): SelectItem[] {
        if (orderByProperty != undefined) {
            value = sortByAttribute(value, orderByProperty);
        }

        if (value)
            return value.map(function (item) { return { label: item, value: (item[valueProperty] || item) } });
        else
            return [];
    }
}

function sortByAttribute(array, ...attrs) {
    // generate an array of predicate-objects contains
    // property getter, and descending indicator
    let predicates = attrs.map(pred => {
        let descending = pred.charAt(0) === '-' ? -1 : 1;
        pred = pred.replace(/^-/, '');
        return {
            getter: o => o[pred],
            descend: descending
        };
    });
    // schwartzian transform idiom implementation. aka: "decorate-sort-undecorate"
    return array.map(item => {
        return {
            src: item,
            compareValues: predicates.map(predicate => predicate.getter(item))
        };
    })
        .sort((o1, o2) => {
            let i = -1, result = 0;
            while (++i < predicates.length) {
                if (o1.compareValues[i] < o2.compareValues[i]) result = -1;
                if (o1.compareValues[i] > o2.compareValues[i]) result = 1;
                if (result *= predicates[i].descend) break;
            }
            return result;
        })
        .map(item => item.src);
}
