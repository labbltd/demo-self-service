import { PegaEmbed, PegaEmbedProps } from "@labb/react-adapter";
import ReactDOM from "react-dom/client";
import './pega/ContainerMapping';

export const normalizeAttribute = (attribute: string) => {
    return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const normalizeAttributeValue = (value: string) => {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

class PegaWebComponent extends HTMLElement {
    reactRoot!: HTMLElement;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.reactRoot = document.createElement('div');
        this.reactRoot.id = 'react-root';
        this.shadowRoot?.appendChild(this.reactRoot);
    }

    connectedCallback() {
        const props = this.getPropsFromAttributes<PegaEmbedProps>();
        console.log('loading pega embed with props', props);
        const root = ReactDOM.createRoot(this.reactRoot);
        root.render(<>
            <style>@import url('http://localhost:8081/styles.css?inline')</style>
            <PegaEmbed {...props} />
        </>);
    }

    private getPropsFromAttributes<T>(): T {
        const props: Record<string, string> = {};

        for (let index = 0; index < this.attributes.length; index++) {
            const attribute = this.attributes[index];
            props[normalizeAttribute(attribute.name)] = normalizeAttributeValue(attribute.value);
        }

        return props as T;
    }
}
customElements.define("labb-embed", PegaWebComponent);
