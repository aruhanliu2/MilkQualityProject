import { Item } from "../models/alignment";

export class AlignmentService {
    private items: Item[] = [];

    constructor() {}
       addItem(farm: string,
        date: string,
        time: string,
        good: number,
        bad: number) {
            this.items.push(new Item(farm, date, time, good, bad));
            console.log(this.items);
       }

       getItems() {
           return this.items.slice();
       }

       updateItems(index: number,
        farm: string,
        date: string,
        time: string,
        good: number,
        bad: number) {
            this.items[index] = new Item(farm, date, time, good, bad);
       }

       removeItem(index: number) {
           this.items.splice(index, 1);
       }
}