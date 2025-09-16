import { ChangeEvent } from "react"

interface BOIFile { name: string, type: string, size: string, id: string };

export function BOIAttachment(props: {
    id: string,
    label: string,
    files: BOIFile[],
    errorMessage: string,
    deleteFile: (file: BOIFile) => Promise<void>,
    uploadFile: (event: ChangeEvent) => Promise<void>
}) {
    return <div className="sc-bhvsvk hfskxH field medium" data-id="field_1748_57">
        <fieldset>
            <div className="sc-dVAgQd gRHQTq">
                <legend className="field-label ">{props.label}</legend>
            </div>
            <div className="sc-cXUDFq cqGMmD field-description-above" color="monotoneDark">
                <div className="sc-hvjqFJ fRyVuv">
                    <p color="monotoneDark" className="sc-gkhwGK hFYMkp">You can upload up to 5 files, maximum 2MB each in size.</p>
                </div>
            </div>
            <div className="sc-goYhtw fFlsBO">
                {props.files.map(file => <div key={file.id} placeholder="" className="sc-kZNyYa jWQpdQ  u-mb-2 inputWrapper">
                    <input type="file" placeholder="" id={props.id} className="sc-feVKPA MYzjg"
                        onChange={async (e) => {
                            await props.deleteFile(file);
                            await props.uploadFile(e);
                        }} />
                    <label htmlFor={props.id} placeholder="" className="sc-RpQnP hmQRPb">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-image" className="svg-inline--fa fa-file-image fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z">
                            </path>
                        </svg>
                        <dl className="sc-kcEpFW iWMaAw">
                            <dt className="sc-hjcUWp bhrdiW">{file.name}</dt>
                            <dd className="sc-itfrAl idtjZg">{file.size}</dd>
                        </dl>
                    </label>
                    <button onClick={() => props.deleteFile(file)} type="button" aria-label="Deletefile_example_JPG_500kB.jpg" className="sc-eoLBcO kCZoWR">Delete</button>
                    <div placeholder="" className="sc-gceUhE iWOtFq u-ml-0 u-mt-2 u-ml-1 acceptedFileTypes">Files must be .jpg, .png, .jpeg or .pdf format.</div>
                </div>)}
                <div className="sc-kZNyYa jWQpdQ  u-mb-2 inputWrapper">
                    <input type="file"
                        id="file-input-field_1748_57-1" className="sc-feVKPA MYzjg"
                        onChange={(e) => props.uploadFile(e)} />
                    <label htmlFor="file-input-field_1748_57-1" className="sc-RpQnP kvZrXZ">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file" className="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z">
                            </path>
                        </svg>
                        <strong>Browse or take a photo</strong>
                    </label>
                    <div className="sc-gceUhE iWOtFq u-ml-0 u-mt-2 u-ml-1 acceptedFileTypes">Files must be .jpg, .png, .jpeg or .pdf format.</div>
                    {props.errorMessage && <div className="sc-igmeot gtIdoJ">{props.errorMessage}</div>}
                </div>
            </div>
        </fieldset>
    </div>
}