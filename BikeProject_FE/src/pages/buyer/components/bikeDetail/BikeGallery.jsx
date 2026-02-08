function BikeGallery({ images }) {
    return (
        <div className="rounded-xl overflow-hidden border">
            <img
                src={images[0]}
                className="w-full h-[420px] object-cover"
            />
        </div>
    )
}
export default BikeGallery
