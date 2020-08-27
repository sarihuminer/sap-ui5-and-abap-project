sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
], function (Controller,Fragment) {
	"use strict";

	return Controller.extend("Ztest.Ztest.controller.View2", {
		onInit: function () {
			// Set the initial form to be the display one
			this._showFormFragment("Form2");
		//	this.create_newOrder();
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
			var sPath
			= "/sap/opu/odata/sap/ZUI5PURCHASE_ORDERS_SRV/";
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
				
				//oFilter.push(new sap.ui.model.Filter('IvEbeln',sap.ui.model.FilterOperator.EQ,'0000000001'));
				var oData={};
				//var f=this._getFormFragment("Form2");
				//console.log(f);
				
				var Pname = this.getView().byId("productName")._lastValue;
				var amount = this.getView().byId("amount")._lastValue;
				var price = this.getView().byId("price")._lastValue;
				console.log("prod name " +Pname+" amount "+amount+" price "+price);
				
				
				oData.Ebeln ="1";
				oData.Ebelp ="0005";
				//oData.NAME = Pname;
				oData.Name = "קפקפי אצבע";
				oData.Amount = 1;
				oData.Price=50;
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
				
			
			
			
			
	});
});