sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Ztest.Ztest.controller.View1", {
		onInit: function () {
			this.PurchaseOrders();
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
			
			//oFilter.push(new sap.ui.model.Filter('IvEbeln',sap.ui.model.FilterOperator.EQ,'0000000001'));
			
			oModel.read("/EtCategoriesSet", {filters: oFilter ,
				 success: function(data) {
					 console.log(data.results);
					 var oJModel = new
					 sap.ui.model.json.JSONModel();

					 oJModel.setData({Categories: data.results});
					 alert(data.results);
				console.log('success');
				var input=that.getView().byId("cmboxCategories");
				input.setModel(oJModel);
				 },
				 error : function(event) {
				 console.log('error');
				 }
				 });
		}	,
	});
});