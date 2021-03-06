import { Children } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { AppRegistry } from "react-native-web";
import { ServerStyleSheet } from "styled-components";

import config from "../app.json";

// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
    #__next {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        AppRegistry.registerComponent(config.name, () => Main);
        const { getStyleElement } = AppRegistry.getApplication(config.name, {});
        const styles = [
            <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
            getStyleElement(),
        ];

        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {Children.toArray(styles)}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html style={{ height: "100%" }}>
                <Head />
                <body style={{ height: "100%", overflow: "hidden" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
