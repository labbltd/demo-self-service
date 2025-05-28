import { videos } from "../../data/videos-data";

export function Videos() {
    return <div className="p-10 grid grid-cols-2 sm:grid-cols-1 gap-4">
        {videos.map(video => <iframe width="560" height="315"
            src={video.url}
            title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>)}
    </div>
}