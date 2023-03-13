import {useNavigate, useParams} from "react-router-dom";
import useFetch from "../../services/useFetch";

const UserDetails = () => {
    const { id } = useParams();
    const { data: user, isPending, error } = useFetch("http://localhost:8000/users/" + id);
    const navigate = useNavigate();

    const handleClick = () => {
        fetch("http://localhost:8000/users/" + user.id, {
            method: "DELETE"
        }).then(() => {
            navigate("/users");
        })    
    }

    const handleBack = () => {
        navigate("/users");
    }

    const handleEditRoute = () => {
        navigate(`/edit-user/${id}`);
    }

    return ( 
        <div className="create">
            <div className="item-details">
                { isPending && <div>Loading...</div> }
                { error && <div>{ error }</div>}
                { user && 
                    <article>
                        <button onClick={handleBack} >   
                            <i class="fa fa-chevron-left" /> Back
                        </button>
                        <h2>{ user.name }</h2>
                        <p>Email { user.email }</p>
                        <div>{ user.address }</div>
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
 
export default UserDetails;