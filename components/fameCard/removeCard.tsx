//HALL OF FAME STUFF

'use client'

type Props = {
    returns: {
        _id: string
    }
}

//function to remove cards from hall of fame by hardcoding the vote, changing it from recommend to Hall of fame to pass
const Remove = ({returns}:Props) => {
    const removeCard = async () => {
        try {
            const response = await fetch ('/api/reviews', {
                method: 'PUT',
                body:JSON.stringify({vote:'pass', id:returns._id})
            })
            if (response.ok) {
                console.log('Project successfully removed from Hall of fame')
            } else {
                console.error('Failed to remove project')
            }
        } catch (error) {
            console.error('Error removing project:', error)
        }
    }

    return (
        <>
            <button onClick={removeCard}>Remove from Hall of fame</button>
        </>
    )
}

export default Remove;