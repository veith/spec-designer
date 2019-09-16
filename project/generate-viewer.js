import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/theme"
import {FBP} from "@furo/fbp";
import "@furo/layout"
import {panelRegistry} from "@furo/route/lib/panelRegistry";
import "@furo/navigation/"
import "@furo/route/"
import "@furo/data/furo-data-object"

/**
 * `generate-viewer`
 *  viewer for ui builder results
 *
 * @customElement
 * @demo demo-generate-viewer
 * @appliesMixin FBP
 */
class GenerateViewer extends FBP(LitElement) {
  constructor() {
    super();

    /**
     * Register hook on wire --entityObj to
     * build up the tree from the registry
     */
    this._FBPAddWireHook("--entityObj", (e) => {
      // build a tree object
      let root = e.data.root;
      let id = 0;
      root.value = {"id":id++,"display_name": "generated elements", icon: "apps"};

      let panel_icons = {"edit": "editor:mode-edit", "display": "visibility"}
      for (let typeName in panelRegistry._registry) {
        let type = panelRegistry._registry[typeName];

        let n = {
          "id":id++,
          "display_name": typeName,
          "is_group_label":true,
          "panel": null,
          "children": []
        };
        for (let panel in type) {
          let p = {
            "id":id++,
            "display_name": panel,
            "icon": panel_icons[panel],
            "panel": panel,
            "link": {
              "rel": null,
              "method": null,
              "href": null,
              "type": typeName
            }
          };
          n.children.push(p)
        }

        root.children.add(n)
      }
    });

  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent(this.name) || css`
        :host {
            display: block;
            height: 100%;
            
        }

        :host([hidden]) {
            display: none;
        }


        /** the background of the bar itself. **/
        ::-webkit-scrollbar {
            width: 8px;
            background-color: var(--surface, white);
        }

        /** the directional buttons on the scrollbar. **/
        ::-webkit-scrollbar-button {
            background-color: var(--on-surface, black);
        }

        /** the empty space “below” the progress bar. **/
        ::-webkit-scrollbar-track {
        }

        /** the top-most layer of the the progress bar not covered by the thumb. **/
        ::-webkit-scrollbar-track-piece {
        }

        /** the draggable scrolling element resizes depending on the size of the scrollable element. **/
        ::-webkit-scrollbar-thumb {
            background-color: var(--on-surface, black);
            border-radius: 10px;
        }

        /** the bottom corner of the scrollable element, where two scrollbar meet. **/
        ::-webkit-scrollbar-corner {
        }

        /** the draggable resizing handle that appears above the scrollbar-corner at the bottom corner of some elements. **/
        ::-webkit-resizer {
        }
    `
  }


  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-split-view>
        <furo-vertical-flex  slot="master">
          <div>
            <furo-button @-click="--expandAll" label="expand all"></furo-button>
            <furo-button @-click="--collapseAll" label="collapse all"></furo-button>

          </div>
          <furo-tree flex ƒ-bind-data="--entityObj(*.data)" ƒ-collapse-all="--collapseAll" @-node-selected="--nodeSelected"
                     ƒ-location-in="--pageQueryChanged"
                     qp="pnl"  ƒ-expand-all="--expandAll" ƒ-collapse-all="--collapseAll"></furo-tree>
        </furo-vertical-flex>
        <furo-pages default="default" scroll>
          <!-- static panels -->
          <panel-default name="default"></panel-default>
          <!-- dynamic panels -->
          <furo-panel-coordinator ƒ-show-page="--nodeSelected" ƒ-close-all="--pageDeActivated" @-panels-changed="--panelChanges"></furo-panel-coordinator>
        </furo-pages>
      </furo-split-view>
     
      
      <furo-data-object type="tree.TreeEntity" ƒ-inject-raw="--tree" @-object-ready="--entityObj"></furo-data-object>

    `;
  }
}

window.customElements.define('generate-viewer', GenerateViewer);
