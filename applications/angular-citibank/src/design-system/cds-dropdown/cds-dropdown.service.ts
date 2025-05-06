import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class CdsDropdownService {
    private subject = new Subject();
    
    onChange() {
        return this.subject.asObservable();
    }

    submit(value: string) {
        this.subject.next(value);
    }
}