import { useState, useEffect} from 'react';



const Card = ({ title, rating, isCool, actors }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${title} has been rendered!`);
  }, [hasLiked])

  useEffect(() => {
    console.log(`A component has been rendered!`);
  
  })

  return (
    <div onClick={() => setCount((prevCount) => prevCount + 1)} className="card-container bg-white rounded-xl p-4 shadow-md w-64 m-4 text-center">
      <h2 className="text-lg font-bold">🎬 Movie: {title}</h2>
      <p>⭐ Rating: {rating}</p>
      <p>🔥 Is Cool: {isCool ? "Yes" : "No"}</p>

      <h3 className="font-semibold mt-2">Actors:</h3>
      <ul className="list-disc ml-5 text-left">
        {actors.map((actor, index) => (
          <li key={index}>{actor.name}</li>
        ))}
      </ul>

      <button
        className={`mt-3 px-5 py-2 rounded-full font-semibold text-white shadow-md transition-all duration-200 
          ${hasLiked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
        onClick={() => setHasLiked(!hasLiked)}
      >
        {hasLiked ? "💚 Liked" : "❤️ Like"}
      </button>
      <p>{count || null}</p>

      <p className="mt-2 font-medium">{hasLiked ? "Liked" : "Not Liked"}</p>
    </div>
  );
};

const Rande = () => {
  return (
    <div className="flex flex-wrap justify-center bg-gray-100 min-h-screen p-6">
      <h1 className="w-full text-2xl font-bold text-center mb-6">Hello World</h1>

      <Card title="Star Wars" rating={5} isCool={true} actors={[{ name: 'Gowda'}, { name: 'cha kudiya' }]} />
      <Card title="The Witcher" rating={4} isCool={false} actors={[{ name: 'Rande' }]} />
      <Card title="Need for Speed" rating={6} isCool={true} actors={[{ name: 'Chakkesh' }]} />
      <Card title="Ford Vs Ferrari" rating={7} isCool={false} actors={[{ name: 'Sulesh' }]} />
    </div>
  );
};

export default Rande;
