import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/theme"
import {FBP} from "@furo/fbp";
import './init'
import "../ui_build/registry"
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import "./main-stage.js"
import "@furo/route/furo-qp-changer"
/**
 * `main-app`
 *
 * @customElement
 * @appliesMixin FBP
 */
class FuroShell extends FBP(LitElement) {

    /**
     *
     * @private
     * @return {CSSResult}
     */
    static get styles() {
        let theme = Theme.getThemeForComponent(this.name);
        if (theme) {
            return [theme]
        } else {
            // language=CSS
            return [css`
                :host {
                    display: block;
                    height: 100vh;
                    overflow: hidden;
                }
            `]
        }
    }

    /**
     * @private
     * @returns {TemplateResult}
     */
    render() {
        // language=HTML
        return html`
            <main-stage @-qp-change-requested="--qpchangerequest"></main-stage>
            <furo-qp-changer ƒ-set-qp="--qpchangerequest"></furo-qp-changer>
        `;
    }

}

window.customElements.define('furo-shell', FuroShell);
