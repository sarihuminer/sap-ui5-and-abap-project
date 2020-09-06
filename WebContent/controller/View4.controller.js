sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller,Fragment,Filter, FilterOperator) {
	"use strict";

	return Controller.extend("Ztest.Ztest.controller.View4", {
		onInit: function () {
			
				},
				onBeforeRendering: function(){
					this.PurchaseOrders();
					},
			
					onPress : function(){
						var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("View3",true);
					},
				getServiceUrl : function() {
					var sUrl;
					var sPath
					= "/sap/opu/odata/sap/ZUI5PURCHASE_ORDERS_SRV/";
					sUrl = sPath;
					return sUrl;
					},
					PurchaseOrders:function(){
						var that = this;
						var sServiceUrl = this.getServiceUrl();
						var oModel = new
						sap.ui.model.odata.ODataModel(sServiceUrl,
						true);
						var oFilter = [];
						
						//oFilter.push(new sap.ui.model.Filter('Ebeln',sap.ui.model.FilterOperator.EQ,'1'));
						oFilter.push(new sap.ui.model.Filter("IvEbeln", sap.ui.model.FilterOperator.EQ, window.globalVariable));
						//oFilter = new sap.ui.model.Filter("Ebeln", "EQ", "1");
						oModel.read("/EtOrderesSet", {filters: oFilter ,
							success: function(data) {
								 console.log('success');
								 var oJModel = new sap.ui.model.json.JSONModel();
								 oJModel.setData({EtzekpoSet: data.results});
								var oTable = that.getView().byId("idMTable2");
								 oTable.setModel(oJModel);	
								 sap.ui.getCore().setModel(oJModel, "globalModel");
								 },
								 error : function(event) {
								 console.log('error');
								 },
								 });
				}	,
				delete_row : function(oEvent){
					alert("edit");
					var oEntry={
							Ebeln : oEvent.oSource.mAggregations.cells[0].mProperties.text,
							Ebelp : oEvent.oSource.mAggregations.cells[1].mProperties.text
					}
					var that = this;
					var sServiceUrl = this.getServiceUrl();
					var oModel = new
					sap.ui.model.odata.ODataModel(sServiceUrl,
					true);
					var oFilter = [];
				
					//oFilter.push(new sap.ui.model.Filter("IvEbeln", sap.ui.model.FilterOperator.EQ, window.globalVariable));				
					oModel.remove("/EtDeleteEkpoSet",oEntry,{
						success: function(data) {
							 console.log('success');
							
							 },
							 error : function(event) {
							 console.log('error');
							 },
							 });
			},
			edit_row : function(){
			alert("edit");
			},
			
			
			
			
	});
});