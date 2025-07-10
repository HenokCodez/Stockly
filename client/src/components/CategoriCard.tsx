export default function CategoriCard({ title, description, image }: { title: string; description: string; image: string }) {
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full max-w-24 text-center">
      <img className="w-36 h-36 object-cover" src={image} alt={title + " image"} />
      <h2 className="text-[14px] text-orange-600 relative top-[105px] right-[90px]  mb-2">{title}</h2>
    </div>
  );
}
