import React from 'react'

class ErrorBoundary extends React.Component<{children : React.ReactNode}, {hasError : boolean}>{
    constructor(props : any){
        super(props)
        this.state = { hasError : false}
    }

    static getDerivedStateFromError(_:Error){
        return { hasError : true}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
         console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render(){
        if(this.state.hasError){
            return <h2>Somthing went wrong.Try again later.</h2>
        }

        return this.props.children
    }
}

export default ErrorBoundary