import Banner from '../components/Banner'
import NewProducts from '../components/NewProducts'
import Slider from '../components/Slider'
import Templates from '../components/Templates'
import WordSlider from '../components/WordSlider'

const Home = () => {
  return (
    <>
      <Slider />
      <NewProducts />
      <WordSlider />
      <Templates />
      <Banner />
    </>
  )
}

export default Home