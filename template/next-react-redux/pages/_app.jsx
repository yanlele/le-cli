import App, {Container} from 'next/app'
import React from 'react'
import reduxStore from '../redux/store'
import { Provider } from 'react-redux'

class MyApp extends App {
    componentDidCatch (error, errorInfo) {
        console.log('CUSTOM ERROR HANDLING', error);
        // This is needed to render errors correctly in development / production
        super.componentDidCatch(error, errorInfo)
    }

    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return {pageProps}
    }

    render () {
        const {Component, pageProps} = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default MyApp