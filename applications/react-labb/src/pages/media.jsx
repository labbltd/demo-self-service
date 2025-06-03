import { media } from "../data/media-data";

export function Media() {
    const dimensions = [560, 315];
    return <div className="p-10 grid grid-cols-2 sm:grid-cols-1 gap-4">
        {media.map(medium => <>
            {medium.type === 'pdf' && <embed key={medium.url} width={dimensions[0]*2} height={dimensions[1]*2} type="application/pdf"
                src={medium.url} />}
            {medium.type === 'youtube' && <iframe key={medium.url} width={dimensions[0]} height={dimensions[1]}
                src={medium.url}
                title="YouTube medium player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"></iframe>}
        </>)}
    </div>
}