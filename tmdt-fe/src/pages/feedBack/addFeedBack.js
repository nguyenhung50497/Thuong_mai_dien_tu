import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function AddFeedBack() {
    const [rating, setRating] = useState(0)
    const handleRating = (rate) => {
        setRating(rate)

    }
    const onPointerMove = (value) => console.log(value)
    const handleReset = () => {
        // Set the initial value
        setRating(0)
    }
    return (
        <>
                <Rating
                    onClick={handleRating}
                />
            <Rating onClick={handleRating} initialValue={rating} />

            <button onClick={handleReset}>reset</button>
        </>
    )
}