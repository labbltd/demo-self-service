import { Directive, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PContainerComponent } from "@labb/angular-adapter";
import { PContainer } from "@labb/dx-engine";
import { Subject, takeUntil } from "rxjs";

@Directive()
export abstract class ControlComponent extends PContainerComponent<PContainer> implements OnInit, OnDestroy {
    public control = new FormControl<any>(null);
    private destroyed = new Subject<boolean>();
    public helperTextOpen = false;

    public override ngOnInit(): void {
        super.ngOnInit();
        this.control.setValue(this.toControlValue(this.container.config.value));
        if (this.container.config.readOnly || this.container.config.disabled) {
            this.control.disable();
        }
        this.control.valueChanges.pipe(
            takeUntil(this.destroyed)
        ).subscribe((val) => {
            if (this.toPegaValue(val) !== this.container.config.value || this.container.config.fieldMetadata?.isDeclarativeTarget === false) {
                this.updateValue(val);
            }
        });
        this.container.updates.subscribe(this.update.bind(this));
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.destroyed.next(true);
        this.container.updates.unsubscribe(this.update.bind(this));
    }

    private update() {
        if (this.container.config.validatemessage) {
            this.control.markAsTouched();
            this.control.markAsDirty();
            this.control.setErrors({ error: true });
        } else {
            this.control.setErrors(null);
        }
        if (this.container.config.readOnly) {
            this.control.disable();
        }
        if (this.container.config.value !== this.toPegaValue(this.control.value)) {
            this.control.setValue(this.toControlValue(this.container.config.value));
            this.control.markAsTouched();
            this.control.markAsDirty();
        }
    }

    public abstract updateValue(val: any): void;
    public abstract toPegaValue(val: any): string;
    public abstract toControlValue(val: any): any;
}