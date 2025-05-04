export const Header = () => {
  return (
    <header className="w-full bg-slate-700 py-10 px-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center text-white">
        <h1 className="text-4xl font-bold">Hangman</h1>
        <nav>
          <ul className="flex gap-10">
            <li>
              <button className="uppercase px-4 py-1 bg-white text-slate-700 rounded-b-md font-bold block hover:bg-slate-300 hover:scale-110">
                Log-in
              </button>
            </li>
            <li>
              <button className="bg-black px-4 py-1 text-white">Log-Out</button>
            </li>
            <li>
              <button className="bg-black px-4 py-1 text-white">Sign-Up</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
