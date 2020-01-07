import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/paper-menu-button/paper-menu-button';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-item/paper-item';

import {customElement, property} from "taktik-polymer-typescript";
import './font-size-picker.html'

import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";

@customElement('font-size-picker')
export class FontSizePicker extends mixinBehaviors([], PolymerElement) {

  $: { editor: HTMLElement, content: HTMLElement } | any

  @property({type: String, notify: true})
  fontSize?: string = ""

  @property({type: Array})
  fontSizeList = ["6 px","7 px","8 px","9 px","10 px","12 px","14 px","16 px","20 px","24 px","32 px","48 px","72 px"]

  constructor() {
    super()
  }

  _onTap(event : any) {
    this.set('fontSize', event.target.id)

    this.dispatchEvent(new CustomEvent('font-size-picker-selected', {detail: {value: this.fontSize}, bubbles:true, composed:true} as EventInit) )

    this.$.fontSizeMenuButton.opened = false
  }

  _fontSize(fontSize? : string) {
    return fontSize && fontSize.length ? fontSize : "11 px"
  }

}


