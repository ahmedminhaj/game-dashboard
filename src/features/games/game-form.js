import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GameForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [category, setCategory] = useState('');
    const [isPending, setIsPending] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            fetch("http://localhost:8000/games/" + id, {
            method: "GET"
            })
            .then((res)=>{
                if(!res.ok){
                    throw Error("Could not fetch data from this source");
                }
                return res.json();
            })
            .then((game) => {
                setName(game.name);
                setCreateDate(game.createDate);
                setCategory(game.category);
                setIsPending(false);
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const game = { name, createDate, category };
        setIsPending(true);

        if(id) {
            fetch("http://localhost:8000/games/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(game)
            }).then(()=>{
                setIsPending(false);
                navigate("/games");
            })
        }else{
            fetch("http://localhost:8000/games", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(game)
            }).then(()=>{
                setIsPending(false);
                navigate("/games");
            })
        }
    }

    const handleBack = () => {
        navigate("/games");
    }

    return (
        <div className="create">
            <button onClick={handleBack} >   
                <i class="fa fa-chevron-left" /> Back
            </button>
            <h2>Add a new Game</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                    type="text"
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Category</label>
                <input
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                ></input> 
                <label>Create Date</label>
                <input
                    required
                    value={createDate}
                    onChange={(e) => setCreateDate(e.target.value)}
                ></input>
                {!isPending && <button>Add Game</button>}
                {isPending && <button disabled>Adding Game...</button>}
            </form>
        </div>
    );
}
export default GameForm;