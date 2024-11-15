import Hero from "./components/Hero";

function App() {
  return (
    <div
      className={`bg-[#131314] overflow-hidden h-screen w-screen selection:bg-cyan-500 selection:text-cyan-900`}
    >
      <Hero />
    </div>
  );
}

export default App;
