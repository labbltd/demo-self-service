/*
 * Sadly @carbon/react does not come with type definitions.
 * Specified most types as any for demo, but this should be of higher quality.
 */
declare module '@carbon/react' {
    import React, { ChangeEvent } from 'react';

    declare type ControlListener = (e: { target: HTMLInputElement }) => void;
    declare type ChangeControl = {
        onChange?: ControlListener;
        onBlur?: ControlListener;
        [key: string]: any;
    }

    declare class Button extends React.Component { props: any; }
    declare class Checkbox extends React.Component { props: any; }
    declare class Column extends React.Component { props: any; }
    declare class DatePicker extends React.Component { props: any; }
    declare class DatePickerInput extends React.Component { props: any }
    declare class FileUploader extends React.Component { props: any; }
    declare class FlexGrid extends React.Component { props: any; }
    declare class FormLabel extends React.Component { props: any; }
    declare class FormItem extends React.Component { props: any; }
    declare class Grid extends React.Component { props: any; }
    declare class Header extends React.Component { props: any; }
    declare class HeaderGlobalAction extends React.Component { props: any; }
    declare class HeaderGlobalBar extends React.Component { props: any; }
    declare class HeaderName extends React.Component { props: any; }
    declare class HeaderPanel extends React.Component { props: any; }
    declare class ProgressIndicator extends React.Component { props: any; }
    declare class ProgressStep extends React.Component { props: any; }
    declare class RadioButton extends React.Component { props: any; }
    declare class RadioButtonGroup extends React.Component { props: any; }
    declare class Row extends React.Component { props: any; }
    declare class Select extends React.Component { props: ChangeControl; }
    declare class SelectItem extends React.Component { props: any; }
    declare class Stack extends React.Component { props: any; }
    declare class Table extends React.Component { props: any; }
    declare class TableBody extends React.Component { props: any; }
    declare class TableCell extends React.Component { props: any; }
    declare class TableHead extends React.Component { props: any; }
    declare class TableHeader extends React.Component { props: any; }
    declare class TableRow extends React.Component { props: any; }
    declare class TextInput extends React.Component { props: ChangeControl; }
    declare class Theme extends React.Component { props: any; }
    declare class Tile extends React.Component { props: any; }
    declare class ToastNotification extends React.Component { props: any; }
}