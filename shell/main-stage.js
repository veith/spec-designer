import {LitElement, html, css} from 'lit-element';
import {FBP} from "@furo/fbp";
import {Theme} from "@furo/framework/theme"
import {Styling} from "./styling";


import "../project/generate-viewer";

import '@furo/layout/furo-vertical-flex';
import '@furo/route/furo-location';
import '@furo/route/furo-pages';
import '@furo/route/furo-app-flow';
import '@furo/fbp/flow-bind';


/**
 * `main-stage`
 *
 * @customElement
 * @appliesMixin FBP
 */
class MainStage extends FBP(LitElement) {

  constructor() {
    super();
  }

  _FBPReady() {
    super._FBPReady();

  }

  /**
   *
   * @private
   * @return {CSSResult}
   */
  static get styles() {

    let theme = Theme.getThemeForComponent(this.name);
    if (theme) {
      return [theme, Styling.theme]
    } else {
      // language=CSS
      return [css`
          :host {
              height: 100%;
              display: block;
              margin: 0;
              color: #212121;
              background-color: var(--background);
              font-family: "Roboto", "Noto", sans-serif;
              line-height: 1.5;
              overflow-x: hidden;

          }


          furo-pages {
              overflow: hidden;
              height: 100%;
          }

      `, Styling.theme]
    }
  }

  /**
   * @private
   * @returns {TemplateResult}
   */
  render() {
    // language=HTML
    return html`
      <furo-pages flex ƒ-inject-location="--locationChanged" default="generates">
        <generate-viewer name="generates"></generate-viewer>
      </furo-pages>
      <furo-location @-location-changed="--locationChanged"></furo-location>
    `;
  }

}

window.customElements.define('main-stage', MainStage);
