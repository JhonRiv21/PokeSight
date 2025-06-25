type Props = {
  name: string;
  image: string;
  id: number;
  onClick: () => void;
};

export const PokeCard = ({ name, image, id, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer relative flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform duration-500"
    >
      <span className="absolute top-2 right-2 text-xs text-gray-500 font-mono">#{id}</span>
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      <span className="mt-2 text-sm font-semibold capitalize">{name}</span>
    </button>
  );
}
