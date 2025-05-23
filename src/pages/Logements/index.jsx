import rentalList from '../../data/logements.json'
import { useParams } from 'react-router'
import { Navigate } from 'react-router'
import Carousel from '../../components/Carousel'
import Collapse from '../../components/Collapse'
import Tags from '../../components/Tags'
import Rating from '../../components/Rating'


function Rental() {
  const { rentalId } = useParams()
  const rental = rentalList.find((index) => index.id === rentalId)

  if (!rental) {
    return <Navigate to="/adresse-introuvable" />
  }

  return (
    <section className="rental-page">
      <Carousel slides={rental.pictures} />
      <div className="rental-info-container">
        <div className="rental-info">
          <h1 className="rental-info__title">{rental.title}</h1>
          <p className="rental-info__location">{rental.location}</p>
          <div className="rental-info__tags">
            <Tags tag={rental.tags} />
          </div>
        </div>
        <div className="renter-info">
          <div className="renter-info__identity">
            <p className="renter-info__identity__name">{rental.host.name}</p>
            <img
              className="renter-info__identity__pic"
              src={rental.host.picture}
              alt=""
            />
          </div>
          <Rating rating={rental.rating} />
        </div>
      </div>
      <div className="rental-collapse-container">
        <Collapse
          className="collapse collapse--small"
          title="Description"
          text={rental.description}
        />
        <Collapse
          className="collapse collapse--small"
          title="Équipements"
          text={rental.equipments.map((equipment, index) => (
            <li key={index}>{equipment}</li>
          ))}
          state={true}
        />
      </div>
    </section>
  )
}

export default Rental