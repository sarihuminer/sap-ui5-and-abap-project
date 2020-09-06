sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	'sap/ui/model/json/JSONModel',
	'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/Token'
], function (Controller,Fragment,JSONModel, ColumnListItem, Label, Token) {
	"use strict";

	return Controller.extend("Ztest.Ztest.controller.View2", {
		onInit: function () {
			// Set the initial form to be the display one
			this._showFormFragment("Form2");
			this._oMultiInput = this.getView().byId("multiInput");
			this._oMultiInput.setTokens(this._getDefaultTokens());

			this.oColModel =  new JSONModel({
				"cols": [
				 		{
				 			"label": "ProductId",
				 			"template": "ItemId",
				 			"width": "5rem"
				 		},
				 		{
				 			"label": "Product Name",
				 			"template": "ItemName"
				 		},
				 		{
				 			"label": "price",
				 			"template": "ItemPrice"
				 		},
				 		{
				 			"label": "Category",
				 			"template": "Category"
				 		}
				 	]
				 }
);
			
		},
		onPress : function(){
			var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("View1",true);
		},
		_formFragments: {},
		_showFormFragment : function (sFragmentName) {
		//	var oPage = this.byId("page");

        //  oPage.removeAllContent();
		//	oPage.insertContent(this._getFormFragment(sFragmentName));
		},
		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "Ztest.Ztest.view." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		getServiceUrl : function() {
			var sUrl;
			var sPath = "/sap/opu/odata/sap/ZUI5PURCHASE_ORDERS_SRV/";
			sUrl = sPath;
			return sUrl;
			},
			create_newOrder: function() {
				var that = this;
				var sServiceUrl = this.getServiceUrl();
				var oModel = new
				sap.ui.model.odata.ODataModel(sServiceUrl,
				true);
				var oFilter = [];
				
				var Pname = this.getView().byId("productName")._lastValue;
				var amount = this.getView().byId("amount")._lastValue;
				var price = this.getView().byId("price")._lastValue;
				console.log("prod name " +Pname+" amount "+amount+" price "+price);
				

				var oEntry = {
						Ebeln: "1",
						Ebelp: "0005",
						Name:  Pname,
						Amount: parseInt(amount),
						Price: parseInt(price)
					};
				
				oModel.create("/EtAddEkpoSet", oEntry, {
					  success: function(oCreatedEntry) {
					  console.log("succses!");
					  }, 
					  error: function(oError) { 
console.log("erorr !!!!!!  :( "); }
					});
			
				},
				
				onValueHelpRequested: function() {
					var aCols = this.oColModel.getData().cols;
					console.log(aCols);
					this._oValueHelpDialog = sap.ui.xmlfragment("Ztest.Ztest.view.ValueHelpDialogBasic", this);
					this.getView().addDependent(this._oValueHelpDialog);
					var oJModel = new sap.ui.model.json.JSONModel();
					oJModel = this.getItems();
					console.log(oJModel);
					
					
					this._oValueHelpDialog.getTableAsync().then(function (oTable) {
						
						oTable.setModel(this.oJModel,"items");
						oTable.setModel(this.oColModel, "columns");

						if (oTable.bindRows) {
							oTable.bindAggregation("rows", "/Items");
						}

						if (oTable.bindItems) {
							oTable.bindAggregation("items", "/Items", function () {
								return new ColumnListItem({
									cells: aCols.map(function (column) {
										return new Label({ text: "{" + column.template + "}" });
									})
								});
							});
						}
						this._oValueHelpDialog.update();
					}.bind(this));

					this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
					this._oValueHelpDialog.open();
				},
				getItems: function(){
					var that = this;
					var sServiceUrl = this.getServiceUrl();
					var oModel = new
					sap.ui.model.odata.ODataModel(sServiceUrl,true);
					var oFilter = [];
	
					oFilter.push(new sap.ui.model.Filter("IvCategory", sap.ui.model.FilterOperator.EQ, '1'));
					oModel.read("/EtItemsSet", {filters: oFilter ,
						 success: function(data) {
							 console.log(data.results);
							 var oJModel = new sap.ui.model.json.JSONModel();

							 oJModel.setData({Items: data.results});
							
						console.log('success');
						//var input=that.getView().byId("cmboxItems");
						//input.setModel(oJModel);
						 return oJModel;
						 },
						 error : function(event) {
						 console.log('error');
						 }
						 });
				},

				onValueHelpOkPress: function (oEvent) {
					var aTokens = oEvent.getParameter("tokens");
					this._oMultiInput.setTokens(aTokens);
					this._oValueHelpDialog.close();
				},

				onValueHelpCancelPress: function () {
				
					this._oValueHelpDialog.close();
					
				},

				onValueHelpAfterClose: function () {
					this._oValueHelpDialog.destroy();
				},

				_getDefaultTokens: function () {
					var oToken = new Token({
						key: "HT-1001",
						text: "Notebook Basic 17 (HT-1001)"
						
					});

					return [oToken];
				}
			
			
			
	});
});