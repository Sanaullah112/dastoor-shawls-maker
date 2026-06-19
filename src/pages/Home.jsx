import Banner from '../Components/Banner';
import HeroSlideshow from '../Components/HeroSlideshow';
import Blogs from '../Components/Blogs/Blogs';
import BestSeller from '../Components/BestSeller';

const Home = () => {
  return (
    <>
      <main>
        <Banner />
        <div className="mt-10">
          <HeroSlideshow />
        </div>
        <BestSeller />
       <Blogs />
      </main>
    </>
  )
}

export default Home