import {useNavigate, useParams} from "react-router-dom";
import useFetch from "../../services/useFetch";

const GameDetails = () => {
    const { id } = useParams();
    const { data: game, isPending, error } = useFetch("http://localhost:8000/games/" + id);
    const navigate = useNavigate();

    const handleClick = () => {
        fetch("http://localhost:8000/games/" + game.id, {
            method: "DELETE"
        }).then(() => {
            navigate("/games");
        })
    }

    const handleBack = () => {
        navigate("/games");
    }

    const handleEditRoute = () => {
        navigate(`/edit-game/${id}`);
    }

    return ( 
        <div className="create">
            <div className="item-details">
                { isPending && <div>Loading...</div> }
                { error && <div>{ error }</div>}
                { game && 
                    <article>
                        <button onClick={handleBack} >   
                            <i class="fa fa-chevron-left" /> Back
                        </button>
                        <h2>{ game.name }</h2>
                        <p>Category { game.category }</p>
                        <div>Created at { game.createDate }</div>
                        <div className="item-details-action">
                            <button onClick={handleClick}>Delete</button>
                            <button onClick={handleEditRoute}>Edit</button>
                        </div>
                    </article>
                }
            </div>
        </div>
    );
}
 
export default GameDetails;