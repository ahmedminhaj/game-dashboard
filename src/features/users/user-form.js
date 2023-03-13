import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isPending, setIsPending] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            fetch("http://localhost:8000/users/" + id, {
            method: "GET"
            })
            .then((res)=>{
                if(!res.ok){
                    throw Error("Could not fetch data from this source");
                }
                return res.json();
            })
            .then((user) => {
                setName(user.name);
                setEmail(user.email);
                setAddress(user.address);
                setIsPending(false);
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name, email, address};
        setIsPending(true);

        if(id){
            fetch("http://localhost:8000/users/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            }).then(()=>{
                setIsPending(false);
                navigate("/users");
            })
        }else{
            fetch("http://localhost:8000/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            }).then(()=>{
                setIsPending(false);
                navigate("/users");
            })
        }
    }

    const handleBack = () => {
        navigate("/users");
    }

    return (
        <div className="create">
            <button onClick={handleBack} >   
                <i class="fa fa-chevron-left" /> Back
            </button>
            <h2>Add a new User</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                    type="text"
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Email</label>
                <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input> 
                <label>Address</label>
                <input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></input>
                {!isPending && <button>Add User</button>}
                {isPending && <button disabled>Adding User...</button>}
            </form>
        </div>
    );
}
export default UserForm;