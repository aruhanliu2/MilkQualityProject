
import { Item } from "../models/teat";

export class TeatService {
    private items: Item[] = [];

    constructor() {}
       addItem(farm: string,
        date: string,
        time: string,
        observer: string,
        milker: string,
        clean: number,
        deep_present: number,
        small_dirt: number,
        large_dirt: number) {
            this.items.push(new Item(farm, date, time, observer, milker, clean, deep_present, small_dirt, large_dirt));
            console.log(this.items);
       }

       getItems() {
           return this.items.slice();
       }

       updateItems(index: number,
        farm: string,
        date: string,
        time: string,
        observer: string,
        milker: string,
        clean: number,
        deep_present: number,
        small_dirt: number,
        large_dirt: number
                    ) {
            this.items[index] = new Item(farm, date, time, observer, milker, clean, deep_present, small_dirt, large_dirt);
       }

       removeItem(index: number) {
           this.items.splice(index, 1);
       }
}