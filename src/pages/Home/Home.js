import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";

function Home() {
   return (
    <div className="home">
      <Hero />
      <Cards />
    </div>
  );
}

export default Home;
