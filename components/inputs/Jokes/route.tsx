import { NextResponse } from "next/server"; 
import { useEffect, useState } from "react";
import axios from 'axios'


interface Joke {
    title: string,
    text: string,
}

const JokePage = () => {
    const [joke, setJoke] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://uselessfacts.jsph.pl/?type=GET /api/v2/facts/random?language=en&', {
                    headers: {
                     // 'Content-Type': 'application/json',
                      // 'X-JokesOne-Api-Secret': 'API HERE', breyta!!
                    },
                });

                if (response.data.contents?.jokes?.length > 0) {
                    setJoke(response.data.content.jokes[0].joke);
                }

                setJoke(response.data.content.jokes[0].joke);
            }   catch (error) {
                console.log('Error fetching joke:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {joke && (
                <div>
                    <h2>{joke.title}</h2>
                    <p>{joke.text}</p>
                    </div>
            )}
        </div>
    );
};

export default JokePage