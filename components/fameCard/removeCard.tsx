'use client'

import { useState } from "react"
import { Label } from "./styles"

type Props = {
    returns: {
        _id: string
    }
}

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
            <button onClick={removeCard}>Change vote</button>
        </>
    )
}

export default Remove;