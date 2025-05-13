
import homeBanner from '../../assets/banner_home.png'
import rentalList from '../../data/logements.json'
import Card from '../../components/Card'
import Banner from '../../components/Banner' 
import { Link } from 'react-router' 

function Home() {
  return (
    <div>
      <Banner
        picture={homeBanner}
        title="Chez vous, partout et ailleurs"
        className="banner"
      />
      <section className="cards-section">
        <div className="cards-section__cards-container">
          {rentalList.map((rental) => (
            <Link to={`/logement/${rental.id}`} key={rental.id}>
              <Card picture={rental.cover} title={rental.title} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home