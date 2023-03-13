import { useEffect, useState } from "react";
import "./game.css";
import { useNavigate, Link } from "react-router-dom";

const Games = () => {
    const [games, setGames] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const fetchGames = (url) => {
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error("Could not fetch data from this source");
            }
            return res.json();
        })
        .then(data => {
            setGames(data);
            setIsPending(false);
            setError(null);
        })
    }

    useEffect(() => {
        fetchGames("http://localhost:8000/games");
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/create-game");
    }

    const onFilter = (e) => {
        const inputValue = e.target.value;

        if(inputValue !== ""){
            const result = games.filter(item => {
                return item.name.toLowerCase().startsWith(inputValue.toLowerCase());
            })
            setGames(result);
        }else{
            fetchGames("http://localhost:8000/games");
        }
    }

    return(
        <div className="content">
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {games && <div>
                <div className="sub-header">
                    <h2>All Games</h2>
                    <div className="serch-box">
                        <input
                            className="search"
                            type="search"
                            onChange={onFilter}
                            placeholder="Search by name.."
                        />
                        <button onClick={handleClick}>Add Game</button>
                    </div>
                </div>
                {games.map(game => (
                    <div className="game-preview" key={game.id} >
                        <Link to={`/games/${game.id}`}>
                            <h2>{ game.name }</h2>
                            <div className="game_card_bottom">
                                <p className="text-primary-p">Created at: { game.createDate }</p>
                                <span className="font-bold text-title">Category: { game.category }</span>    
                            </div>
                        </Link>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default Games;