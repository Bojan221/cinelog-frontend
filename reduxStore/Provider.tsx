"use client"

import { Provider } from "react-redux"
import { store } from "./store"
import AuthInit from "./AuthInit"

interface Props {
    children: React.ReactNode
}

const ReduxProvider = ({children} : Props) =>  {
    return (
        <Provider store={store}>
            <AuthInit />
            {children}
        </Provider>
    )
}

export default ReduxProvider;