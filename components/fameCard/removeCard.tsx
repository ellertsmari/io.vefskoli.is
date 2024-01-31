// HALL OF FAME STUFF
// function to remove cards from hall of fame by hardcoding the vote, changing it from 'recommend to hall of fame' to 'pass'

'use client'

// defining the type of the props that the remove component will receive
type Props = {
    returns: {
        _id: string
    }
}

// the Remove component definition with one prop: 'returns'
const Remove = ({returns}:Props) => {

    // function to remove the card making a PUT request to api/reviews
    const removeCard = async () => {
        try {
            const response = await fetch ('/api/reviews', {
                method: 'PUT',
                // changing the vote from recommend to pass
                body:JSON.stringify({vote:'pass', id:returns._id})
            })
            // if everything is ok, change the vote and remove the project
            if (response.ok) {
                console.log('Project successfully removed from Hall of fame')
            } else {
                console.error('Failed to remove project')
            }
        //error handling if the fetch isn't successful
        } catch (error) {
            console.error('Error removing project:', error)
        }
    }

    // the component returns a button that, when clicked, calls the removeCard function
    return (
        <>
            <button onClick={removeCard}>Remove from Hall of fame</button>
        </>
    )
}

export default Remove;