import { useEffect, useState } from "react";
import axios from 'axios';

interface Joke {
    title: string;
    text: string;
}

const JokePage = () => {
    const [joke, setJoke] = useState<string | null>(null);
    const [jokeList, setJokeList] = useState<string[]>([]);

    const fetchJoke = async () => {
        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en', {});

            if (response.data && response.data.text) {
                setJoke(response.data.text);
            }

        } catch (error) {
            console.log('Error fetching joke:', error);
        }
    };

    const fetchMultipleJokes = async () => {
        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random/5.json?language=en', {});

            if (response.data && response.data.length > 0) {
                setJokeList(response.data.map((j: Joke) => j.text));
            }

        } catch (error) {
            console.log('Error fetching jokes:', error);
        }
    };

    return (
        <div>
            <button onClick={() => { fetchJoke(); }}>Get the useless fact of the day</button>
            <br />
            {joke && (
                <div>
                    <p>{joke}</p>
                </div>
            )}
            <br />
            {jokeList.length > 0 && (
                <select onChange={(e) => setJoke(jokeList[parseInt(e.target.value, 10)])}>
                    {jokeList.map((joke, index) => (
                        <option key={index} value={index}>{joke}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default JokePage;
