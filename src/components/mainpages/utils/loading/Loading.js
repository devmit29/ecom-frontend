import React from 'react'
import './loading.css'

function Loading() {
    return (
        <div className="load-page">
            <div className="loader">
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className='text'>Please Wait for 20-25 seconds as the backend is on the free plan so it takes time to load for the first time.</p>
            <p className='text'>Sorry for the inconvenience.</p>
        </div>
    )
}

export default Loading
