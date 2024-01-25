'use client'

import { useState } from "react"

type Props = {
    returns: {
        _id: string
    }
}

const Delete = ({returns}:Props) => {
    const deleteCard = () => {
        fetch('/api/hallOfFame', {
            method: 'DELETE',
            body:JSON.stringify({id:returns._id})
        })
    }

    return (
        <button
            onClick={deleteCard}
        >Remove this project from Hall of fame
        </button>
    )
}

export default Delete