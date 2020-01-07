import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import './ht-pat-hub-utils.js';
import * as models from 'icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatHubDiaryNote extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style scrollbar-style">

            #diaryNoteDialog{
                height: calc(95% - 12vh);
                width: 95%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            #historyViewer{
                height: calc(92% - 12vh);
                width: 92%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .title{
                height: 30px;
                width: auto;
                font-size: 20px;
            }

            .content{
                display: flex;
                height: calc(98% - 140px);
                width: auto;
                margin: 1%;
            }

            .hubDocumentsList{
                display: flex;
                height: 100%;
                width: 50%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
            }

            .hubDocumentsList2{
                height: 100%;
                width: 30%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
                overflow: auto;
            }

            .hubDocumentViewer{
                display: flex;
                height: 100%;
                width: 70%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
            }

            #transaction-list{
                height: 100%;
                width: 100%;
                max-height: 100%;
                overflow: auto;
            }

            #htPatHubTransactionPreViewer{
                height: 98%;
                width: 100%;
                max-height: 100%;
            }

            .sublist{
                background:var(--app-light-color);
                padding:0;
                border-radius:0 0 2px 2px;
            }

            collapse-buton{
                --iron-collapse: {
                    padding-left: 0px !important;
                };

            }

            ht-spinner {
                height: 42px;
                width: 42px;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }

            .documentListContent{
                margin: 1%;
                width: auto;
            }

            .modal-title {
                background: var(--app-background-color-dark);
                margin-top: 0;
                padding: 16px 24px;
            }

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
            }


            .menu-item {
                @apply --padding-menu-item;
                height: 24px;
                min-height: 24px;
                font-size: var(--font-size-normal);
                text-transform: inherit;
                justify-content: space-between;
                cursor: pointer;
                @apply --transition;
            }

            .sublist .menu-item {
                font-size: var(--font-size-normal);
                min-height:20px;
                height:20px;
            }

            .menu-item:hover{
                background: var(--app-dark-color-faded);
                @apply --transition;
            }

            .menu-item .iron-selected{
                background:var(--app-primary-color);

            }

            .list-title {
                flex-basis: calc(100% - 72px);
                font-weight: bold;
            }

            .one-line-menu {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
                padding-left:0;
            }

            .diaryNoteDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .historyViewer{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .hub-menu-list{
                height: 100%;
                width: 30%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                overflow: auto;
                position: relative;
            }

            .hub-menu-view{
                height: 100%;
                width: 70%;
            }

            .hub-menu-list-header{
                height: 48px;
                width: 100%;
                border-bottom: 1px solid var(--app-background-color-darker);
                background-color: var(--app-background-color-dark);
                padding: 0 12px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;
            }

            .hub-menu-list-header-img{
                height: 40px;
                width: 40px;
                background-color: transparent;
                margin: 4px;
                float: left;
            }

            .hub-menu-list-header-info{
                margin-left: 12px;
                display: flex;
                align-items: center;
            }

            .hub-menu-list-header-img img{
                width: 100%;
                height: 100%;
            }

            .hub-name{
                font-size: var(--font-size-large);
                font-weight: 700;
            }

            .menu-item-icon{
                height: 20px;
                width: 20px;
                padding: 0px;
            }

            collapse-button[opened] .menu-item-icon{
                transform: scaleY(-1);
            }

            .bold {
                font-weight: bold;
            }

            .table-line-menu {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                width: 100%;
            }

            .table-line-menu-top{
                padding-left: var(--padding-menu-item_-_padding-left);
                padding-right: var(--padding-menu-item_-_padding-right);
                box-sizing: border-box;
            }

            .table-line-menu div:not(:last-child){
                border-right: 1px solid var(--app-background-color-dark);
                height: 20px;
                line-height: 20px;
            }

            .table-line-menu .date{
                width: 100%;
                padding-right: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .table-line-menu .type{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 35%;
            }

            .table-line-menu .auth{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 45%
            }

            .table-line-menu .pat{
                width: 4%;
                padding-right: 4px;
                padding-left: 4px;
            }

            .table-line-menu .dateTit{
                width: 14%;
                padding-right: 10px;
            }

            .table-line-menu .typeTit{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 35%;
                white-space: nowrap;
            }

            .table-line-menu .authTit{
                padding-left:4px;
                padding-right:4px;
                width: 45%;
            }

            .table-line-menu .patTit{
                width: 4%;
                padding-left: 4px;
                padding-right: 4px;
                text-align: center;
                padding-left: var(--padding-menu-item_-_padding-left);
            }

            .never::after{
                background-color: var(--app-status-color-nok)
            }

            .yes::after{
                background-color: var(--app-status-color-ok)
            }

            .no::after{
                background-color: var(--app-status-color-pending)
            }

            .pat-access{
                height: 16px;
                width: 16px;
                position: relative;
                color: var(--app-text-color);
            }

            .pat-access::after{
                position: absolute;
                display: block;
                content: '';
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                height: 6px;
                width: 6px;
                border-radius: 50%;
            }

            .hub{
                text-transform: uppercase;
            }

            .tab-selector {
                height: 48px;
                background: var(--app-secondary-color-light);
            }

            .content{
                max-height: calc(100% - 45px);
            }

            .pageContent{
                padding: 12px;
                width: auto;
                box-sizing: border-box;
            }

            .modalDialog {
                height: 500px;
                width: 800px;
            }

            /*Local style mods*/
            iron-pages{
                height: calc(100% - 48px);
                width: auto;
                overflow: auto;
            }

            .hub-submenu-title {
                padding-left: 12px;
            }

            .hub-menu-view {
                width: 85%;
            }

            .hub-menu-list{
                width: 15%;
            }

            #commentDialog .content {
                padding: 0 12px;
                display: block;
                height: calc(100% - 120px);
                margin: 0%;
            }

            .headerLabel{
                font-weight: bold;
            }

            .headerInfoField{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                align-content: stretch;
                width: calc(100% / 2);
                padding: 0 8px;
                box-sizing: border-box;
            }

            .headerMasterTitle{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }

            .hub-doc-container{
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                margin-bottom: 12px;
            }

            .headerInfoLine{
                width: 100%;
                padding: 4px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            #titleInfo{
                height: 20px;
                width: 98%;
                margin-bottom: 12px;
                font-size: 20px;
                font-weight: bold;
            }

            .headerInfo{
                height: auto;
                width: 100%;
                box-sizing: border-box;
            }
        </style>

        <paper-dialog id="diaryNoteDialog">

            <div class="content diaryNoteDialog">
                <div class="hub-menu-list">
                    <div class="hub-menu-list-header">
                        <div class="hub-menu-list-header-img">
                            <template is="dom-if" if="[[_isEqual(curHub,'rsw')]]">
                                <img src="../../../../../images/rsw-icn.png">
                            </template>
                            <template is="dom-if" if="[[_isEqual(curHub,'vitalink')]]">
                                <img src="../../../../../images/vitalink-icn.png">
                            </template>
                            <template is="dom-if" if="[[_isEqual(curHub,'rsb')]]">
                                <img src="../../../../../images/rsb-icn.png">
                            </template>
                        </div>
                        <div class="hub-menu-list-header-info">
                            <div class="hub-name">
                                [[localize('hub','Hubs',language)]] <span class="hub">[[curHub]]</span>
                            </div>
                        </div>

                    </div>
                    <div class="hub-submenu-container">
                        <div class="hub-submenu-title">
                        </div>
                    </div>
                </div>
                <div class="hub-menu-view">
                    <paper-tabs class="tab-selector" selected="{{tabs}}">
                        <paper-tab>
                            <iron-icon class="tabIcon" icon="vaadin:clipboard-cross"></iron-icon>
                            [[localize('add_diary_note','Add diary note',language)]]
                        </paper-tab>
                    </paper-tabs>
                    <iron-pages selected="[[tabs]]">
                        <page>
                            <div class="pageContent">
                                <div id="titleInfo">
                                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                                </div>
                                <div class="hub-doc">
                                    <div class="blockInfo">
                                        <div class="hub-doc-container">
                                            <div>
                                                <ht-spinner active="[[uploading]]"></ht-spinner>
                                                <template is="dom-if" if="[[!uploading]]">
                                                    <div class="hub-doc-container">
                                                        <div class="headerMasterTitle headerLabel">[[localize('com','Comments',language)]]</div>
                                                        <div class="headerInfoField">
                                                        <dynamic-text-area value="{{myComment}}" label="[[localize('com','Comments',language)]]"></dynamic-text-area>
                                                        </div>
                                                        <template is="dom-if" if="[[enableExtendedProperties]]">
                                                        <div class="headerMasterTitle headerLabel">[[localize('diary_type','Note type',language)]]</div>
                                                        <div class="headerInfoField ">
                                                            <template id="cdDiarySelection" is="dom-repeat" items="[[cdDiary]]">
                                                                <vaadin-checkbox id="cdDiarySelection_[[item]]">[[localize(item,item,language)]]</vaadin-checkbox>
                                                            </template>
                                                        </div>
                                                        <div class="headerMasterTitle headerLabel">[[localize('care_context','Care context',language)]]</div>
                                                        <div class="headerInfoField">
                                                            <template is="dom-repeat" items="[[noteContext]]">
                                                                <vaadin-checkbox id="noteContextSelection_[[item]]">[[localize(item,item,language)]]</vaadin-checkbox>
                                                            </template>
                                                        </div>
                                                        </template>
                                                        <div class="headerMasterTitle headerLabel">[[localize(psyDoc,"Document psychiatrique",language)]]</div>
                                                        <div class="headerInfoField"><vaadin-checkbox id="psyDoc">[[localize(psyDoc,"Document psychiatrique",language)]]</vaadin-checkbox></div>
                                                    </div>
<!--                                                    TODO: document info-->
                                                    <div class="hub-doc-container">
                                                        <div class="headerMasterTitle headerLabel">[[localize('hub_att_doc','Attached document',language)]]</div>
                                                        <div class="headerInfo">
                                                            <div class="headerInfoLine">
                                                                <div class="headerInfoField"><span class="headerLabel">[[localize('file_name','File name',language)]]: &nbsp; </span> [[document.name]]</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </page>
                    </iron-pages>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--other" on-tap="_generateDiaryNote" disabled="[[isLoading]]"><iron-icon icon="icons:build"></iron-icon> [[localize('_generateDiaryNote','_generateDiaryNote',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_generateAndPutDiaryNote" disabled="[[isLoading]]"><iron-icon icon="icons:backup"></iron-icon> [[localize('_uploadDiaryNote','Upload diary note',language)]]</paper-button>
            </div>
        </paper-dialog>
        <ht-pat-hub-utils id="htPatHubUtils" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload" on-close-hub-dialog="_closeOverlay"></ht-pat-hub-utils>
`;
  }

  static get is() {
      return 'ht-pat-hub-diary-note';
  }

  static get properties() {
      return {
          api: {
              type: Object,
              value: null
          },
          user: {
              type: Object,
              value: null
          },
          language: {
              type: String
          },
          opened: {
              type: Boolean,
              value: false
          },
          patient:{
              type: Object
          },
          currentContact:{
              type: Object
          },
          tabs: {
              type:  Number,
              value: 0
          },
          isLoading:{
              type: Boolean,
              value: false
          },
          activeItem: {
              type: Object,
              observer: '_activeItemChanged'
          },
          eidCardNumber:{
              type: String,
              value : '',
          },
          isiCardNumber:{
              type: String,
              value : '',
          },
          curHub:{
              type: String,
              value: null,
              observer: '_curHubChanged'
          },
          curEnv:{
              type: String,
              value: null
          },
          hubId:{
              type: Number,
              value : 0
          }
          ,
          hubEndPoint:{
              type: String,
              value:'https://acchub.reseausantewallon.be/HubServices/IntraHub/V3/IntraHub.asmx'
          },
          hubPackageId:{
              type: String,
              value:null
          },
          hubApplication : {
              type: String,
              value:null
          },
          hubSupportsConsent:{
              type: Boolean,
              value: false
          },
          hcpHubConsent:{
              type: Object
          },
          patientHubConsent:{
              type: Object
          },
          patientHubTherLinks:{
              type: Object
          },
          patientHubInfo:{
              type: Object
          },
          hcpZip:{
              type:String,
              value:'1000'
          },
          hubTransactionList:{
              type: Array,
              value: function(){
                  return [];
              }
          },
          selectedTransaction:{
              type: Object
          },
          revokeTransactionResp:{
              type: String,
              value: ""
          },
          supportBreakTheGlass:{
              type: Boolean,
              value: false
          },
          breakTheGlassReason:{
              type: String,
              value: null
          },
          newSumehr:{
              type: Object,
              value: null
          },
          hubSumehr:{
              type: Object,
              value: null
          },
          hubSumehrXml:{
              type: String,
              value: null
          },
          itemsToExclude:{
              type:Array,
              value: function(){
                  return [];
              }
          },
          newSumehrToLog:{
              type: Object,
              value: null
          },
          updateList:{
              type:Array,
              value: function(){
                  return [];
              }
          },
          parentDialog:{
              type: Object,
              value: null
          },
          viewHistory:{
              type: Boolean,
              value: false
          },
          messageBefore:{
              type: Object,
              value: null
          },
          messageAfter:{
              type: Object,
              value: null
          },
          myComment:{
              type: String,
              value: ""
          },
          documentId:{
              type: String,
              value: ""
          },
          attachmentId:{
              type: String,
              value: ""
          },
          document:{
              type: Object,
              value: null
          },
          isTest:{
              type: Boolean,
              value: false
          },
          uploading:{
              type: Boolean,
              value: false
          },
          cdDiary:{
              type: Array,
              value: function(){
                  return ["diabetes", "medication", "movement", "nutrition", "oncology", "renalinsufficiency", "woundcare"];
              }
          },
          noteContext:{
              type: Array,
              value: function(){
                  return ["psichronilux", "psipact", "psirelian", "psiresinam", "psi3c4h"];
              }
          },
          enableExtendedProperties:{
              type: Boolean,
              value: true
          }
      };
  }

  static get observers() {
      return ['apiReady(api,user,opened)'];
  }

  ready() {
      super.ready();
      // document.addEventListener('xmlHubUpdated', () => this.xmlHubListener() );
  }

  _dateFormat(date) {
      return date ? this.api.moment(date).format('DD/MM/YYYY') : '';
  }

  apiReady() {
      if (!this.api || !this.user || !this.user.id || !this.opened) return;

      try {
      } catch (e) {
          console.log(e);
      }
  }

  attached() {
      super.attached();
      this.async(this.notifyResize, 1);
  }

  open(docId, comment) {
      this.set('isLoading',true);
      this.set('document', null);
      this.set('myComment', comment);
      if(docId) this.set("documentId", docId);
      this.set("attachmentId", "");
      this.$['diaryNoteDialog'].open();

      //Clear form:
      if(this.enableExtendedProperties) this.cdDiary.forEach(cd => this.shadowRoot.querySelector('#cdDiarySelection_' + cd).checked = false);
      if(this.enableExtendedProperties) this.noteContext.forEach(cd => this.shadowRoot.querySelector('#noteContextSelection_' + cd).checked = false);
      this.shadowRoot.querySelector('#psyDoc').checked = false;

      this.loadDocument(this.documentId, this.attachmentId);
      this._refresh();
      this.set('isLoading',false);
      console.log(this.cdDiary);
  }

  _refresh(){
      const propHub = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.preferredhub') ||
          (this.user.properties[this.user.properties.length] = {
              type: {identifier: 'org.taktik.icure.user.preferredhub'},
              typedValue: {type: 'STRING', stringValue: 'rsw'}
          })

      const propEnv = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.eHealthEnv') ||
          (this.user.properties[this.user.properties.length] = {
              type: {identifier: 'org.taktik.icure.user.eHealthEnv'},
              typedValue: {type: 'STRING', stringValue: 'prd'}
          })
      this.set("curHub", propHub.typedValue.stringValue);
      this.set("curEnv", propEnv.typedValue.stringValue);
      this.set("supportBreakTheGlass", false);
      this._setHub();
  }

  _enableBreakTheGlass(btg){
      return btg;
  }

  _enableTransactionList(hubconsent, supportConsent){
      return this._patientHasHubConsent(hubconsent)|| !supportConsent;
  }

  _enableRegisterConsent(hubconsent, supportConsent){
      return !this._patientHasHubConsent(hubconsent) && supportConsent;
  }

  _enableRevokeConsent(hubconsent, supportConsent){
      return this._patientHasHubConsent(hubconsent) && supportConsent;
  }


  _curHubChanged(){
      this._setHub();
  }

  _setHub(){
      const hubConfig = this.$["htPatHubUtils"].getHubConfig(this.curHub, this.curEnv);
      //this.set('isLoading',true);
      this.set('hcpHubConsent', null);
      this.set('patientHubConsent', null);
      this.set('patientHubTherLinks', null);
      this.set('hubTransactionList', null);
      this.set('patientHubInfo', null);
      this.set('breakTheGlassReason', null);

      this.hubId = hubConfig.hubId;
      this.hubEndPoint = hubConfig.hubEndPoint;
      this.set("hubSupportsConsent", hubConfig.hubSupportsConsent);
      this.hubPackageId = hubConfig.hubPackageId;
      this.hubApplication = hubConfig.hubApplication;
      this.set("supportBreakTheGlass", hubConfig.supportBreakTheGlass);
      //this.set('isLoading', false);
  }

  close() {
      this.$.dialog.close();
  }

  _activeItemChanged(item){

  }


  _openCommentDialog(e){
      e.stopPropagation();
      this.set("isTest", false);
      if(this.$['commentDialog']) this.$['commentDialog'].open();
  }

  _openCommentDialogTest(e){
      e.stopPropagation();
      this.set("isTest", true);
      if(this.$['commentDialog']) this.$['commentDialog'].open();
  }

  _closeCommentDialog(e){
      e.stopPropagation();
      if(this.$['commentDialog']) this.$['commentDialog'].close();
  }

  _isEqual(a,b) {
      return (a === b)
  }

  sumehrChanged(sumehr){
      if(this.$['htPatHubTransactionPreViewer']) this.$['htPatHubTransactionPreViewer'].open(this,  sumehr, this.hubSumehr, this.hubSumehrXml);
  }

  _logUpdateMessage(message, messageName, updateReference, mime){
      //updateRerence --> uuid to link old and new sumehr
      if(message){
          return this.api.message().newInstance(this.user)
              .then(nmi => this.api.message().createMessage(_.merge(nmi, { //creation of container message
                      transportGuid: "HUB:OUT:UPDATE-SUMEHR",
                      recipients: [this.user && this.user.healthcarePartyId],
                      metas: {filename: messageName,
                          mediaType: "hub",
                          updateReference: updateReference}, //-->"hub",
                      toAddresses: [_.get(this.user, 'email', this.user && this.user.healthcarePartyId)], //email needed ?
                      subject: "Hub Sumehr Update",
                      status : 0 | 1<<25 | (this.patient.id ? 1<<26 : 0)
                  }))
                      .then(createdMessage => Promise.all([createdMessage,
                          this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("encrypt",
                              this.user, createdMessage,
                              this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(JSON.stringify({patientId : this.patient.id, isAssigned: true}))))]))
                      .then(([createdMessage, cryptedMeta]) => {
                          createdMessage.metas.cryptedInfo = Base64.encode(String.fromCharCode.apply(null, new Uint8Array(cryptedMeta)))
                          return this.api.message().modifyMessage(createdMessage)
                      })
                      .then(createdMessage => this.api.document().newInstance(this.user, createdMessage, { //creation of first document (before)
                          documentType: 'sumehr',
                          mainUti: this.api.document().uti(mime),
                          name: "sumehrUpdate_" + messageName + "_" +moment().format("YYYYMMDDhhmmss")
                      }))
                      .then(newDocInstance => this.api.document().createDocument(newDocInstance))
                      .then(createdDocument => this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("encrypt", this.user, createdDocument, this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(message)))
                          .then(encryptedFileContent => ({createdDocument, encryptedFileContent })))
                      .then(({createdDocument, encryptedFileContent}) => this.api.document().setAttachment(createdDocument.id, null, encryptedFileContent))
                      .then(resourcesObject => {
                          //Import into currentContact
                          let sc = this.currentContact.subContacts.find(sbc => (sbc.status || 0) & 64);
                          if (!sc) {
                              sc = { status: 64, services: [] };
                              this.currentContact.subContacts.push(sc);
                          }
                          const svc = this.api.contact().service().newInstance(this.user, {
                              content: _.fromPairs([[this.language, { documentId: resourcesObject.id, stringValue: resourcesObject.name }]]),
                              label: 'document',
                              tags: [{type: 'CD-TRANSACTION', code: 'sumehr'}]
                          });
                          this.currentContact.services.push(svc);
                          sc.services.push({ serviceId: svc.id });

                          this.saveCurrentContact().then(c => {
                              this.dispatchEvent(new CustomEvent('hub-download', {}))
                          }).then(res => res);

                      }).finally(() => {
                          console.log("finally of _logUpdateMessage")
                      }).catch(e => {
                          console.log("---error upload attachment---", e)
                      })
              )
      }else{
          return Promise.resolve(null);
      }
  }

  saveCurrentContact() {
      if(!this.currentContact.id ) {
          this.currentContact.id = this.api.crypto().randomUuid()
      }
      return (this.currentContact.rev ? this.api.contact().modifyContactWithUser(this.user, this.currentContact) : this.api.contact().createContactWithUser(this.user, this.currentContact)).then(c=>this.api.register(c,'contact')).then(c => (this.currentContact.rev = c.rev) && c);
  }

  getAttachment(doc) {
      return this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, doc.id, _.size(doc.encryptionKeys) ? doc.encryptionKeys : doc.delegations).then(
          ({extractedKeys: enckeys}) => this.api.document().getAttachment(_.trim(_.get(doc,"id","")), _.trim(_.get(doc,"attachmentId","")), enckeys.join(','))
      ).catch(err => {
          return err;
      })
  }

  _generateAndPutDiaryNote(){
      this.set("uploading", true);
      if (this.patient && this.patient.ssin && this.api.tokenId) {
          //read the checkboxes
          const ds = this.enableExtendedProperties ? this.cdDiary.map(cd => this.shadowRoot.querySelector('#cdDiarySelection_' + cd).checked ? cd : "" ).filter(itm => itm !== "") : [];
          console.log("ds", ds);
          const nc = this.enableExtendedProperties ? this.noteContext.map(cd => this.shadowRoot.querySelector('#noteContextSelection_' + cd).checked ? cd : "" ).filter(itm => itm !== "") : [];
          console.log("nc", nc);
          const isPsy = this.shadowRoot.querySelector('#psyDoc') ? this.shadowRoot.querySelector('#psyDoc').checked : false;
          this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
              this.api.patient().getPatientWithUser(this.user,this.patient.id)
                  .then(patientDto => this.getDocProm(this.documentId)
                      .then(doc => this.getSfksProm(doc, hcp)
                          .then(sfks => {
                              console.log("patientDto", patientDto, "doc", doc, "sfks", sfks);
                              return this.api.bekmehr().generateDiaryNoteExportWithEncryptionSupport(patientDto.id, this.user.healthcarePartyId, "fr", {
                                  secretForeignKeys: sfks ? sfks.extractedKeys : [],//secretForeignKeys.extractedKeys, //todo: replace by the docs sfks
                                  recipient: hcp,
                                  note: this.myComment,
                                  tags: ds,
                                  contexts: nc,
                                  isPsy: isPsy,
                                  documentId: this.documentId,
                                  attachmentId: this.attachmentId
                              }).then(output =>
                                  this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
                                      .then(hcp => {
                                              let reader = new FileReader();
                                              let me = this;
                                              reader.onload = function () {
                                                  console.log("diarynote = ", reader.result);
                                              }
                                              reader.readAsText(output);
                                              return this.api.fhc().Hubcontroller().putTransactionUsingPOST(this.hubEndPoint,
                                                  this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword,
                                                  hcp.lastName, hcp.firstName, hcp.nihii, hcp.ssin, this.hcpZip,
                                                  this.hubId,
                                                  this.patient.ssin,
                                                  output,
                                                  this.hubPackageId, this.hubApplication
                                              )
                                          }
                                      ).then(putResp => {
                                          if (putResp) {
                                              this.set("uploading", false);
                                              this._closeDialogs();
                                              return putResp;
                                              //todo close dialog
                                              //todo refresh list
                                          } else {
                                              this.set("uploading", false);
                                              return null;
                                          }
                                      }
                                  )
                              )
                          }))
                  ))
      }else{
          this.set("uploading", false);
          return Promise.resolve(null)
      }
  }

  _patientHasHubConsent(cs){
      if((cs && cs.author && cs.author.hcparties && cs.author.hcparties[0]) || !this.hubSupportsConsent){
          return true;
      }
      else{
          return false;
      }
  }

  getHubEndPoint(){
      return this.hubEndPoint;
  }

  _generateDiaryNote(){
      if (this.patient) {
          let pat = null;
          //read the checkboxes
          const ds = this.enableExtendedProperties ? this.cdDiary.map(cd => this.shadowRoot.querySelector('#cdDiarySelection_' + cd).checked ? cd : "" ).filter(itm => itm !== "") : [];
          console.log("ds", ds);
          const nc = this.enableExtendedProperties ? this.noteContext.map(cd => this.shadowRoot.querySelector('#noteContextSelection_' + cd).checked ? cd : "" ).filter(itm => itm !== "") : [];
          console.log("nc", nc);
          const isPsy = this.shadowRoot.querySelector('#psyDoc') ? this.shadowRoot.querySelector('#psyDoc').checked : false;
          this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
              this.api.patient().getPatientWithUser(this.user,this.patient.id)
                  .then(patientDto => this.getDocProm(this.documentId)
                      .then(doc => this.getSfksProm(doc, hcp)
                          .then(sfks => {
                              console.log("patientDto", patientDto, "doc", doc,"sfks", sfks);
                              return this.api.bekmehr().generateDiaryNoteExportWithEncryptionSupport(patientDto.id, this.user.healthcarePartyId, "fr", {
                                  secretForeignKeys: sfks ? sfks.extractedKeys : [],//secretForeignKeys.extractedKeys, //todo: replace by the docs sfks
                                  recipient: hcp,
                                  note: this.myComment,
                                  tags: ds,
                                  contexts: nc,
                                  isPsy: isPsy,
                                  documentId: this.documentId,
                                  attachmentId: this.attachmentId
                              }).then(output => {
                                  let reader = new FileReader();
                                  const myself = this;
                                  reader.onload = function() {
                                      // console.log("sumehr = ", reader.result);
                                  }
                                  reader.readAsText(output);
                                  //creation of the xml file
                                  let file = typeof output === "string" ? new Blob([output] ,{type: "application/xml"}) : output
                                  //creation the downloading link
                                  let a = document.createElement("a");
                                  document.body.appendChild(a);
                                  a.style = "display: none";
                                  //download the new file
                                  let url = window.URL.createObjectURL(file);
                                  a.href = url;
                                  a.download = (patientDto.lastName || "Doe").replace(" ","_") + "_" + (patientDto.firstName || "John").replace(" ","_") + "_" + (moment().format("x"))+"_diarynote.xml";
                                  a.click();
                                  window.URL.revokeObjectURL(url);
                                  document.body.removeChild(a);
                                  // this.document.tags.push("DiaryNoteComment", this.myComment)
                                  // this.api.document().modifyDocument(this.document).then(doc => doc);//doc => this.api.register(doc, "document")).then(doc => this.set('document', doc));
                                  // if(this.$['commentDialog']) this.$['commentDialog'].close();
                                  // this.$["sumehrPreviewDialog"].close();
                              }).catch( error=> console.log(error))
                          })
                      )
                  )
              )
      }
  }

  getDocProm(docId){
      if(docId){
          return this.api.document().getDocument(docId);
      }else{
          return Promise.resolve(null);
      }
  }

  getSfksProm(doc, hcp){
      if(doc){
          return this.api.crypto().extractEncryptionsSKs(doc, hcp.id)
      } else {
          return Promise.resolve(null);
      }
  }

  loadDocument(documentId, attachmentId){
      if (this.patient) {
          this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
              this.api.patient().getPatientWithUser(this.user,this.patient.id)
                  .then(patientDto => this.getDocProm(this.documentId)
                      .then(doc => this.getSfksProm(doc, hcp)
                          .then(sfks => {
                              this.set("document", doc);
                              console.log("document set", doc);
                              //TODO: get comment
                          })
                      )
                  )
          )
      }
  }

  _closeDialogs(){
      this.$['diaryNoteDialog'].close();
  }

  _localizeHcpType(type){
      return this.localize("cd-hcp-"+type, type, this.language)
  }
}
customElements.define(HtPatHubDiaryNote.is, HtPatHubDiaryNote);
