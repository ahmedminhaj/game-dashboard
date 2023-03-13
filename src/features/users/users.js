import { useEffect, useState } from "react";
import "./users.css";
import { useNavigate, Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = (url) => {
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error("Could not fetch data from this source");
            }
            return res.json();
        })
        .then(data => {
            setUsers(data);
            setIsPending(false);
            setError(null);
        })
    }

    useEffect(() => {
        fetchUsers("http://localhost:8000/users");
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/create-user");
    }

    const onFilter = (e) => {
        const inputValue = e.target.value;

        if(inputValue !== ""){
            const result = users.filter(item => {
                return item.name.toLowerCase().startsWith(inputValue.toLowerCase());
            })
            setUsers(result);
        }else{
            fetchUsers("http://localhost:8000/users");
        }
    }

    return(
        <div className="content">
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {users && <div>
                <div className="sub-header">
                    <h2>All User</h2>
                    <div className="serch-box">
                        <input
                            className="search"
                            type="search"
                            onChange={onFilter}
                            placeholder="Search by name.."
                        />
                        <button onClick={handleClick}>Add User</button>
                    </div>
                </div>
                {users.map(user => (
                    <div className="user-preview" key={user.id} >
                        <Link to={`/users/${user.id}`}>
                            <h2>{ user.name }</h2>
                            <div className="user_card_bottom">
                                <p className="text-primary-p">{ user.email }</p>
                                <span className="font-bold text-title">{ user.address }</span>    
                            </div>
                        </Link>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default Users;