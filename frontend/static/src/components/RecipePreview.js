import Card from 'react-bootstrap/Card';
import './../styles/recipepreview.css'

const RecipePreview = ({title, image}) => {
    return (
        <Card className="bg-dark text-white recipe-preview">
            <div className="img-box">
                <Card.Img className="card-img" src={image} alt={title} />
            </div>
            <Card.ImgOverlay>
                <Card.Title className="card-title" >{title}</Card.Title>
            </Card.ImgOverlay>
        </Card>
    )
}

export default RecipePreview;