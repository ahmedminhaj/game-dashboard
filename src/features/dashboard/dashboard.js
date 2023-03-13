import "./dashboard.css";
import gaming from "../../assets/game.png";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [users, setUsers] = useState(null);
    const [games, setGames] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        fetchUsers("http://localhost:8000/users");
        fetchGames("http://localhost:8000/games");
    }, []);

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
            setIsLoading(false);
        })
    }

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
            setIsLoading(false);
        })
    }

    return(
        <div className="main__container">
            <div className="main__title">
                <img src={gaming} alt="game" />
                <div className="main__greeting">
                    <h1>Hello gamer</h1>
                    <p>Welcome to the gaming world</p>
                </div>
            </div>
            <div className="main__cards">
                <div className="card">
                    <i className="fa fa-user fa-2x text-lightblue"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Number of Users</p>
                        { users && <span className="font-bold text-title">{users.length}</span> }   
                    </div> 
                </div>
                <div className="card">
                    <i className="fa fa-gamepad fa-2x text-lightblue"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Total Available Game</p>
                        { games && <span className="font-bold text-title">{games.length}</span> } 
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Dashboard;