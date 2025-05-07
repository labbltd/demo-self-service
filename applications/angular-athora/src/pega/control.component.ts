import { Directive, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DefaultProps } from "@labb/constellation-core-types";
import { PContainerComponent } from "@labb/angular-adapter";
import { PContainer } from "@labb/dx-engine";
import { Subject, takeUntil } from "rxjs";

type ControlProps = {
    visibility: boolean,
    value: string,
    readOnly: boolean,
    disabled: boolean,
    validatemessage: string,
    helperText: string,
    label: string,
    fieldMetadata?: {
        isDeclarativeTarget: boolean;
    }
};

@Directive()
export abstract class ControlComponent<T = string, S extends ControlProps = DefaultProps> extends PContainerComponent<PContainer<S>> implements OnInit, OnDestroy {
    public control = new FormControl<T | null>(null);
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

    public abstract updateValue(val: T | null): void;
    public abstract toPegaValue(val: T | null): string;
    public abstract toControlValue(val: string): T | null;
}