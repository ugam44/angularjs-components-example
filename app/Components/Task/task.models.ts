export interface ITask {
    id: number;
    name: string;
    category: string;
    owner: string;
    recurrence: string;
    active?: boolean;
    recipients?: string[];
    from?: string;
}
export class Task {
    id = 0;
    name = "";
    category = "";
    owner = "";
    recurrence = "";
    active = true;
    recipients:string[] = [""];
    from = "";
    constructor (options:ITask) {
        Object.keys(options).forEach(function (key:string) {
            if (this.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        });
        if (!this.from) {
            this.from = this.owner;
        }
        if (this.recipients.length === 1 && this.recipients[0] === "") {
            this.recipients[0] = this.owner;
        }
    }
}