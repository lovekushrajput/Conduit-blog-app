import React, { Component } from "react";

export class ErrorBoundary extends Component {
    constructor() {
        super()
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }


    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
                    <button
                        className='border border-black mt-4 rounded px-4 text-lg'
                        onClick={() => window.location.reload()}
                    >Please reload the page</button>
                </div>
            )
        }

        return this.props.children
    }
}


