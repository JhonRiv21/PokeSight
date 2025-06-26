type Props = {
  name: string;
  image: string;
  id: number;
  onClick: () => void;
};

export const PokeCard = ({ name, image, id, onClick }: Props) => {
  return (
    <div className="relative w-full max-w-xs mx-auto hover:scale-[1.03] transition-transform duration-300">
      <div className="absolute top-[-10px] left-[10px] w-full h-full rounded-2xl z-0 card-bg" />

      <button
        onClick={onClick}
        className="relative cursor-pointer z-10 w-full p-6 rounded-2xl border-2 shadow-md flex flex-col items-center card-container"
      >
        <span className="absolute top-3 right-3 text-xl font-mono card-id">#{id}</span>

        <img
          src={image}
          alt={name}
          className="rounded-full object-contain w-36 h-36"
          loading="lazy"
        />

        <p className="mt-4 text-lg font-semibold capitalize text-center card-id">{name}</p>
      </button>
    </div>
  );
};