import Loader from "react-loader-spinner";
import React from 'react'
import { usePromiseTracker } from "react-promise-tracker";

function Loading() {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
        <div>
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>)
    )
}

export default Loading