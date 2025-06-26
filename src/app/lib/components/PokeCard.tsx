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
      <span className="absolute top-2 right-2 text-gray-500">#{id}</span>
      <img src={image} alt={name} className="w-36 h-36 object-contain" />
      <span className="mt-2 font-semibold text-lg capitalize text-gray-600">{name}</span>
    </button>
  );
}
