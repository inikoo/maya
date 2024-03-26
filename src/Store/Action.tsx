export default {
	CreateUserSessionProperties(payload : object) {
		return {
			type: "CreateUserSession",
			payload
		};
	},
	CreateUserOrganisationProperties(payload : object) {
		return {
			type: "CreateUserOrganisation",
			payload
		};
	},
	DestroyUserSessionProperties() {
		return {
			type: "DestroyUserSession",
		};
	},
	CreateWarehouseProperties(payload : object) {
		return {
			type: "CreateWarehouse",
			payload
		};
	},
	DestroyWarehouseProperties(payload : object) {
		return {
			type: "DestroyWarehouse",
			payload
		};
	},
};