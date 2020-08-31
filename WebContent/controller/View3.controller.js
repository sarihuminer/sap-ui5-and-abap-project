sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
], function (Controller,Fragment) {
	"use strict";

	return Controller.extend("Ztest.Ztest.controller.View3", {
		onInit: function () {
		
			var that = this;
			 var sServiceUrl   = this.getServiceUrl();
			 var oModel        = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			 var oFilter = [];
			
			 oFilter.push(new sap.ui.model.Filter('Ebeln', sap.ui.model.FilterOperator.EQ, '2000000' ));

			 oModel.read('/EtZekkoSet', {filters: oFilter ,
			success: function(data) {
				 console.log('success');
				 var oJModel = new sap.ui.model.json.JSONModel();
				 oJModel.setData({EtZekkoSet: data.results});
				 var oTable = that.getView().byId("idMTable");
				 oTable.setModel(oJModel);	
				 sap.ui.getCore().setModel(oJModel, "globalModel");
				 },
				 error : function(event) {
				 console.log('error');
				 },
				 });
		},
		getServiceUrl : function() {

			var sUrl;
			var sPath = "/sap/opu/odata/sap/ZUI5PURCHASE_ORDERS_SRV";
			sUrl = sPath;
			return sUrl; 
			},
			onPress: function (oEvent) {
				var ebeln = oEvent.oSource.mAggregations.cells[0].mProperties.text;
				var oItem = oEvent.getSource();
				alert(oItem);
				var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("View4");
				window.globalVariable=ebeln;
					
			
				},
				
			
			
			
			
	});
});